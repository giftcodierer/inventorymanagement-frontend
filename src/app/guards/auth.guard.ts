import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    console.log('AuthGuard - Token:', token);
    console.log('AuthGuard - Role:', role);

    if (token && role) {
      if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
        // Rolle hat keinen Zugriff auf diese Route
        console.log('AuthGuard - Zugriff verweigert für Rolle:', role);
        this.router.navigate(['/login']);
        return false;
      }
      // Rolle hat Zugriff auf diese Route
      console.log('AuthGuard - Zugriff erlaubt für Rolle:', role);
      return true;
    }

    // Kein Token oder Rolle vorhanden, Weiterleitung zur Login-Seite
    console.log('AuthGuard - Kein Token oder Rolle vorhanden');
    this.router.navigate(['/login']);
    return false;
  }
}