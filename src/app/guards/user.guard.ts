import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if(authService.isUser()){
    return true;
  }else{
      router.navigate(['/login']);
      return false
  }
};
