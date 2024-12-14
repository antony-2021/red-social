import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

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

  previousImage(index: number) {
    this.activeImage[index] =
      (this.activeImage[index] - 1 + this.imgs.length) % this.imgs.length;
  }

  nextImage(index: number) {
    this.activeImage[index] = (this.activeImage[index] + 1) % this.imgs.length;
  }

  private userId: string | null = null;

  imgs = [
    'https://i.pinimg.com/736x/5c/53/d9/5c53d92bb1148a0b172ace133fafeaa1.jpg',
    'https://i.pinimg.com/736x/9a/9e/f8/9a9ef8e3e7c42ec8e475c1a238f02e75.jpg',
    'https://i.pinimg.com/736x/ac/c7/ec/acc7ecea15921c1b01689681d89dd416.jpg',
  ];

  user: null | any = null;

  async ngOnInit() {
    await this.getUser();
  }
  async getUser() {
    this.userId = this._authService.getEmail();
    this.user = await this._userService.getUserByEmail(this.userId);
  }

  constructor() {}
}

