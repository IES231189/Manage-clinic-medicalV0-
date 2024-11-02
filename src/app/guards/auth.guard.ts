import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
