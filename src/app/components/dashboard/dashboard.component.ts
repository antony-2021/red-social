import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PublicationUserEntity } from '../../model/publication-user-entity';
import { PublicationUserService } from '../../services/publication-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  email=""
  publicationUserEntityList: PublicationUserEntity[] = []

  constructor(private publicationService: PublicationUserService, private authService:AuthService) { }

  ngOnInit() {
    this.email=this.authService.getEmail()+""
    this.publicationService.list().forEach(publications => this.publicationUserEntityList = publications)
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
