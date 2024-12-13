import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
})
export class MiPerfilComponent implements OnInit {
  private _userService = inject(UserService);
  private _authService = inject(AuthService);

  private userId: string | null = null;

  async ngOnInit() {
    await this.getUser();
  }
  async getUser() {
    this.userId = this._authService.getEmail();

    const userDAta = await this._userService.getUserByEmail(this.userId);

    console.log(userDAta);
  }

  constructor() {}
}
