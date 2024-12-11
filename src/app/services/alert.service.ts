import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertSuccessful(text:string){
    Swal.fire({
      title: '¡Successful!',
      text: text,
      icon: 'success',
      timer: 1600,
    });
  }

  alertWarning(text:string){
    Swal.fire({
      title: '!Warning¡',
      text: text,
      icon: 'warning',
      timer: 1600,
    });
  }
}
