// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response) {
          // Redirection selon le rôle
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/courses']);
          }
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
      }
    });
  }

  loginAsAdmin(): void {
    this.credentials = { email: 'admin@example.com', password: 'admin123' };
    this.onLogin();
  }

  loginAsUser(): void {
    this.credentials = { email: 'user@example.com', password: 'user123' };
    this.onLogin();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
