import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);

  signInWithGoogle(): void {
    this.authService.login();
  }
}
