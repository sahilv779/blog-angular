import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);  // Inject the Router to check the current route
  const currentRoute = router.url; // Get the current route

  // Check if the current route is the login page
  if (currentRoute.includes('/login')) {
    return next(req); // Don't add the token if we're on the login page
  }

  // Get the token from localStorage
  let token = localStorage.getItem('access_token');

  // If there's no token, just continue the request without modifying the headers
  if (!token) {
    return next(req);
  }

  // Clone the request and add the token to the Authorization header
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  });

  return next(authReq);
};
