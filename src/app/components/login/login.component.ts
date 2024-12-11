import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = ''; // Propiedad para el nombre de usuario
  password: string = ''; // Propiedad para la contraseña

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.username && this.password) {
      console.log('Login exitoso:', { username: this.username, password: this.password });
      alert('Inicio de sesión exitoso');
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
