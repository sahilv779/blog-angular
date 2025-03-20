import {Component, inject} from '@angular/core';
import { AuthGoogleService } from '../../../core/services/auth-google.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authGoogleService = inject(AuthGoogleService);

  signInWithGoogle(): void {
    this.authGoogleService.login();
  }
}
