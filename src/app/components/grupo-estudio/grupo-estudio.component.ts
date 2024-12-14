import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GroupService } from '../../services/group.service';
import { AuthService } from '../../services/auth.service';
import { GroupEntity } from '../../model/group-entity';
import { UserService } from '../../services/user.service';
import { combineLatest, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../services/modal/feed.service';

@Component({
  selector: 'app-grupo-estudio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupo-estudio.component.html',
  styleUrl: './grupo-estudio.component.css'
})
export class GrupoEstudioComponent implements OnInit{
  groupEntityList:GroupEntity[]=[]
  myGroupEntityList:GroupEntity[]=[]
  email:string=""

  constructor(
    private groupService:GroupService,
    private authService:AuthService,
    private feedService:FeedService
  ){}

  ngOnInit(): void {
    this.email=this.authService.getEmail();
    this.groupService.list().forEach(list=>this.groupEntityList=list);
    this.groupService.getGroupByEmail(this.email).forEach(list=>this.myGroupEntityList=list);
  }
  
  nuevoGrupo() {
    let imagenBase64:any;

    Swal.fire({
      title: 'Nuevo Grupo',
      html: `
        <form id="grupoForm">
          <label for="nombreGrupo">Nombre del Grupo:</label><br>
          <input type="text" id="nombreGrupo" name="nombreGrupo" placeholder="Ingresa el nombre del grupo" style="width: 70%; padding: 8px;"><br><br>
          <label for="imagenGrupo">Selecciona una Imagen:</label><br>
          <input type="file" id="imagenGrupo" name="imagenGrupo" accept="image/*" style="width: 100%; padding: 8px;"><br><br>
          <img id="preview" src="" alt="Vista previa" style="max-width: 100%; max-height: 200px; display: none; margin-top: 10px; border: 1px solid #ddd; border-radius: 5px;">
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const input = document.getElementById('imagenGrupo') as HTMLInputElement;
        const preview = document.getElementById('preview') as HTMLImageElement;

        input.addEventListener('change', (event: Event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              imagenBase64 = e.target?.result; 
              if (preview) {
                preview.src = imagenBase64 as string;
                preview.style.display = 'block'; 
              }
            };
            reader.readAsDataURL(file);
          }
        });
      },
      preConfirm: () => {
        const nombreGrupo = (document.getElementById('nombreGrupo') as HTMLInputElement).value;
        console.log(imagenBase64);
        

        if (!nombreGrupo || !imagenBase64) {
          Swal.showValidationMessage('El nombre del grupo y la imagen son obligatorios');
          return false;
        }

        return { nombreGrupo, imagenBase64 };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nombreGrupo, imagenBase64 } = result.value!;
        Swal.fire({
          title: `Grupo: ${nombreGrupo}`,
          text: 'Se creo un nuevo grupo',
          imageUrl: imagenBase64 as string, 
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1600
        });

        let group:GroupEntity={
          id: '',
          title: nombreGrupo,
          urlImage: imagenBase64,
          emailUsers: [this.email]
        }
        this.groupService.add(group)
      }
    });
  }

  unirseGrupo(idGrupo:string){
    this.groupService.addUser(idGrupo, this.email);
    Swal.fire({
      text: 'Te uniste a un grupo',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1600
    });
  }

  verGrupo(id:string){
    this.feedService.feedGroup(id)
    
  }
  
}
