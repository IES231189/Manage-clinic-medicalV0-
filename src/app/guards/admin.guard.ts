import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if(authService.isAdmin()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
