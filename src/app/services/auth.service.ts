import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Backend-URL
  private token: string | null = null;
  private userRole: string | null = null;
  private authStatusSubject = new Subject<void>(); 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(username: string, password: string): Observable<{ success: boolean; role: string; jwt: string }> {
    return this.http.post<{ success: boolean; role: string; jwt: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        if (response.success) {
          this.token = response.jwt;
          this.userRole = response.role;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.jwt); 
          }
          this.authStatusSubject.next(); 
        }
      }),
      catchError((error) => {
        console.error('Fehler beim Login', error);
        return of({ success: false, role: '', jwt: '' });
      })
    );
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.role;
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens', error);
        return null;
      }
    }
    return null;
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.userID;
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens', error);
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.token = null;
    this.userRole = null;
    this.authStatusSubject.next(); 
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }

  getAuthStatusListener(): Observable<void> {
    return this.authStatusSubject.asObservable();
  }
}