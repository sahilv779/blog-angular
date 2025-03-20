import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  login() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

}
