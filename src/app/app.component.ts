import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { UserStateService } from './services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projet_fils_rouge_angular';

  currentUser: User | null = null;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStateService: UserStateService 
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = this.authService.isAdmin();

      this.userStateService.setAdminStatus(this.isAdmin);
      
      // Rediriger vers login si pas connecté
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
