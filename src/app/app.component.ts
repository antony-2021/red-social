import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService) { }

  navigate(route: string) {
    this.router.navigate([route])
  }

  cerrarSession() {
    this.authService.logOut();

  }
  
  isLogin(){
    return of(this.authService.isLoggedIn);
  }
}
