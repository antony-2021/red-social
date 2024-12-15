import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserEntity } from '../../model/user-entity';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-edit-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-perfil.component.html',
  styleUrl: './edit-perfil.component.css'
})
export class EditPerfilComponent implements OnInit {
  id = ""
  email = ""
  name = ""
  urlImage=""
  universityCareer = ""
  academicYear = 0
  enabled = false

  constructor(private authService: AuthService, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.authService.getEmail()).then((user) => {
      if (user != null) {
        this.id = user.id
        this.email = user.email
        this.name = user.name
        this.universityCareer = user.universityCareer
        this.academicYear = user.academicYear
        this.enabled = user.enabled
        this.urlImage = user.urlImage
      } else {
        console.error("El usuario no existe.");

      }
    }).catch((error) => {
      console.error(error);
    });
  }

  guardarDatos() {
    this.userService.getUserByEmail(this.authService.getEmail()).then((user) => {
      if (user != null) {
        user.email = this.email
        user.name = this.name
        user.universityCareer = this.universityCareer
        user.academicYear = this.academicYear
        user.urlImage = this.urlImage
        user.enabled = this.enabled

        this.userService.update(user);
        this.alertService.alertSuccessful("Se guardo correctamente los datos")
      } else {
        console.error("El usuario no existe.");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      // Leer archivo como URL base64
      reader.onload = () => {
        this.urlImage = reader.result as string; // Guardar el resultado en urlImage
      };

      reader.readAsDataURL(file); // Iniciar la lectura del archivo
    }
  }
}
