import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './inventory-management-login.component.html',
  styleUrls: ['./inventory-management-login.component.css']
})
export class InventoryManagementLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/list']);
        } else {
          alert('Login fehlgeschlagen');
        }
      },
      error: (error) => {
        console.error('Fehler beim Login', error);
        alert('Login fehlgeschlagen');
      }
    });
  }
}