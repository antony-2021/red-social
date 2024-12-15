import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserEntity } from '../../model/user-entity';
import Swal from 'sweetalert2';
import { PublicationUserEntity } from '../../model/publication-user-entity';
import { PublicationUserService } from '../../services/publication-user.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
})
export class MiPerfilComponent implements OnInit {
  private _userService = inject(UserService);
  private _authService = inject(AuthService);

  activeImage: number[] = Array(5).fill(0);
  private email: string = "";
  
  user: UserEntity | null = {
    id: '',
    email: '',
    name: '',
    universityCareer: '',
    academicYear: 0,
    urlImage: '',
    enabled: false
  };

  publicationUserEntityList:PublicationUserEntity[]=[]

  constructor(private publicationService: PublicationUserService) { }

  ngOnInit() {
    this.email = this._authService.getEmail();
    this._userService.getUserByEmail(this.email).then(t => this.user = t);
    this.publicationService.listByIdEmail(this.email).forEach(publications=>this.publicationUserEntityList=publications)
  }

  async getUser() {
    this.email = this._authService.getEmail();
    this.user = await this._userService.getUserByEmail(this.email);
  }

  nuevaPublicacion() {
    let imagenBase64: any;

    Swal.fire({
      title: 'Nueva Publicación',
      html: `
          <form id="grupoForm">
            <label for="nombreGrupo">Título de la Publicación:</label><br>
            <input type="text" id="nombreGrupo" name="nombreGrupo" placeholder="Ingresa el título" style="width: 70%; padding: 8px;"><br><br>
            <label for="descripcionGrupo">Descripción:</label><br>
            <textarea id="descripcionGrupo" name="descripcionGrupo" placeholder="Ingresa una descripción" style="width: 70%; padding: 8px;"></textarea><br><br>
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
        const descripcionGrupo = (document.getElementById('descripcionGrupo') as HTMLTextAreaElement).value;
        console.log(imagenBase64);

        if (!nombreGrupo || !imagenBase64) {
          Swal.showValidationMessage('El título y la imagen son obligatorios');
          return false;
        }

        return {
          title: nombreGrupo,
          description: descripcionGrupo,
          urlImage: [imagenBase64], // Storing the base64 as an array of image URLs
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description, urlImage } = result.value!;

        const newPublication: PublicationUserEntity = {
          id: '',
          title: title,
          description: description,
          urlImage: urlImage,
          interaction: [],
          emailUser: this.user?.email + "",
        };

        this.publicationService.add(newPublication)
        this.publicationService.listByIdEmail(this.email+"").forEach(publications=>this.publicationUserEntityList=publications)

        Swal.fire({
          title: `Publicación: ${title}`,
          text: 'Se creó una nueva publicación',
          imageUrl: urlImage[0],
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1600
        });

      }
    });
  }

  addLike(id:string){
    this.publicationService.updateInteractionByEmail(id, this.email, true, null);
    this.publicationService.listByIdEmail(this.email+"").forEach(publications=>this.publicationUserEntityList=publications)
  }

  addComment(id:string, comment:string){
    this.publicationService.updateInteractionByEmail(id, this.email, false, comment);
    this.publicationService.listByIdEmail(this.email+"").forEach(publications=>this.publicationUserEntityList=publications)
  }


}

