import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('isLoggedIn');
    }
    return false;
  }

  login() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
  }
}