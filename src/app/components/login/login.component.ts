import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showRegisterForm: boolean = false;
  name: string = '';
  email: string = '';


  constructor(private authService: AuthService, private alertService: AlertService) { }

  onSubmitLogin() {
    if (this.username && this.password) {
      console.log('Login exitoso:', { username: this.username, password: this.password });
      this.alertService.alertSuccessful("Inicio de sesión exitoso");

      this.logIn(this.username, this.password);
    } else {
      this.alertService.alertSuccessful("Por favor, complete todos los campos.");
    }
  }

  onSubmitRegister() {
    this.signUp(this.email, this.password);
    this.alertService.alertSuccessful("Registro exitoso");
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }


  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password);
  }

  loginGoogle() {
    this.authService.logInWithGoogleProvider();
  }

  signUp(email: string, password: string) {
    this.authService.signUpWithEmailAndPassword(email, password);
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }

  async resetPassword(){
    const { value: email } = await Swal.fire({
      title: "ingrese su correo electrónico",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address"
    });
    if (email) {
      this.authService.recoveryPassword(email);
      Swal.fire(`Revise su correo: ${email}`);
    }
  }
}
