import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {httpInterceptor} from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideOAuthClient(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor]))
  ],
};
