import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
  
    if(authService.isLoggedIn){
      router.navigate(['dashboard']);
      
    }else{
      router.navigate(['login']);
    }
    return true
  } catch (error) {
    return true;
  }
};
