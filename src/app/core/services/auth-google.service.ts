import {inject, Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {

  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  constructor() {
    this.initConfig();
  }

  initConfig(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '298663895573-mi44mp7ss3urop9lt28tjk7s3sm8gp8c.apps.googleusercontent.com',
      redirectUri: 'http://localhost:4200/main/oauth-redirect',
      scope: 'openid profile email',
      oidc: false,

    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then();
  }

  login() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }
}
