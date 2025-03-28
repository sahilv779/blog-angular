import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getAccessToken()) {
    return true; // Allow access
  } else {
    router.navigate(['/login']).then(); // Redirect to login
    return false; // Deny access
  }
};
