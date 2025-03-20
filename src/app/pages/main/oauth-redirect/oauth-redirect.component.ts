import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-oauth-redirect',
  imports: [],
  templateUrl: './oauth-redirect.component.html',
  standalone: true,
  styleUrl: './oauth-redirect.component.css'
})
export class OAuthRedirectComponent implements OnInit {

  token: string | null = null;
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (!params) {
        console.error('URL fragment not found.');
        this.router.navigate(['/auth/login']); // Redirect to login page
      }
      this.token = params['token'];
      const userData = params['user'];
      if (userData) {
        this.user = JSON.parse(decodeURIComponent(userData));
      }
      // Store the token in local storage or a service
      if (this.token) {
        localStorage.setItem('jwt', this.token);
        // Store the token in your AuthService or local storage
        this.authService.setAccessToken(this.token);
        // Redirect the user to the dashboard
        this.router.navigate(['/main/dashboard']);
      } else {
        // Handle error (e.g., token not found)
        console.error('Access token not found in the URL fragment.');
        this.router.navigate(['/auth/login']); // Redirect to login page
      }
    });
  }
}
