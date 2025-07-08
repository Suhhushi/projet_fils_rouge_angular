import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, LoginRequest, AuthResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            const authResponse: AuthResponse = {
              user: { ...user, password: undefined }, // Ne pas exposer le mot de passe
              token: this.generateToken()
            };
            
            // Sauvegarder l'utilisateur connecté
            localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
            localStorage.setItem('authToken', authResponse.token);
            this.currentUserSubject.next(authResponse.user);
            
            return authResponse;
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'user';
  }

  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + Date.now();
  }

  // Inscription (optionnel)
  register(user: Omit<User, 'id'>): Observable<User> {
    const newUser = {
      ...user,
      dateCreation: new Date().toISOString().split('T')[0]
    };
    return this.http.post<User>(this.apiUrl, newUser);
  }
}
