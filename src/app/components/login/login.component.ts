import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  showRegisterForm: boolean = false;
  name: string = '';


  constructor(private authService: AuthService, private alertService: AlertService, private userService:UserService) { }
  ngOnInit(): void {
    this.userService.getUserByEmail("david@gmail.co").then((user)=>console.log(user))
    
  }

  onSubmitLogin() {
    if (this.email && this.password) {
      this.logIn(this.email, this.password);
    } else {
      this.alertService.alertWarning("Por favor, complete todos los campos.");
    }
  }

  onSubmitRegister() {
    this.signUp(this.name, this.email, this.password);
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

  signUp(name:string, email: string, password: string) {
    this.authService.signUpWithEmailAndPassword(name, email, password);
    //this.authService.signUpWithEmailAndPassword(email, password)
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
