import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import Swal from 'sweetalert2';
import { FeedComponent } from './feed/feed.component';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  static idFeedGroup:string=""
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  feedGroup(id:string) {
    FeedService.idFeedGroup=id;

    Swal.fire({
      title: 'Feed Group',
      html: '<div id="feed-container"></div>', // Contenedor para el componente
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'custom-swal-popup' // Clase personalizada para ajustar el tamaño
      },
      didOpen: () => {
        const container = document.getElementById('feed-container');
        if (container) {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FeedComponent);
          const componentRef = componentFactory.create(this.injector);
          this.appRef.attachView(componentRef.hostView);
          container.appendChild(componentRef.location.nativeElement);
        }
      },
      willClose: () => {
        // Limpia el componente Angular cuando SweetAlert se cierre
        const container = document.getElementById('feed-container');
        if (container) {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FeedComponent);
          const componentRef = componentFactory.create(this.injector);
          this.appRef.detachView(componentRef.hostView);
        }
      }
    });
  }
}
