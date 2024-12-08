import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inventory-management-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory-management-login.component.html',
  styleUrls: ['./inventory-management-login.component.css']
})
export class InventoryManagementLoginComponent {
  username: string = '';
  password: string = '';
  loginSuccessful: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginSuccessful = true;
      this.authService.login();
      this.router.navigate(['/list']);
    } else {
      this.loginSuccessful = false;
      alert('Login failed. Please check your username and password.');
    }
  }
}