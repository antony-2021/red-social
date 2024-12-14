import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../group.service';
import { GroupEntity } from '../../../model/group-entity';
import { FeedService } from '../feed.service';
import Swal from 'sweetalert2';
import { PublicationEntity } from '../../../model/publication-entity';
import { AuthService } from '../../auth.service';
import { PublicationService } from '../../publication.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  group: GroupEntity = {
    id: '',
    title: '',
    urlImage: '',
    emailUsers: []
  }
  idGroup: string = FeedService.idFeedGroup
  emailUser: string = ""
  publicationList:PublicationEntity[]=[]

  constructor(private groupService: GroupService, private authService: AuthService, private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.groupService.getById(this.idGroup).subscribe(group => this.group = group);
    this.emailUser = this.authService.getEmail()
    this.publicationService.listByIdGroup(this.idGroup).forEach(list=>this.publicationList=list);
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

        const newPublication: PublicationEntity = {
          id: '',
          title: title,
          description: description,
          urlImage: urlImage,
          interaction: [],
          emailUser: this.emailUser,
          idGroup: this.idGroup
        };

        this.publicationService.add(newPublication)

        Swal.fire({
          title: `Publicación: ${title}`,
          text: 'Se creó una nueva publicación',
          imageUrl: urlImage[0],
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1600
        });

        console.log(newPublication); // This is your new PublicationEntity
      }
    });
  }

  addComment(idPublication: string, comment: string){    
    this.publicationService.updateInteractionByEmail(idPublication, this.emailUser, false, comment);
  }

  addLike(idPublication: string, like: boolean){
    
    this.publicationService.updateInteractionByEmail(idPublication, this.emailUser, like, "");
  }
}
