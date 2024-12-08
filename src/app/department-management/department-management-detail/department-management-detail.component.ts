import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-department-management-detail',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './department-management-detail.component.html',
  styleUrl: './department-management-detail.component.css'
})

export class DepartmentDetailComponent {
  name: string = '';
  location: string = '';
  departments: { name: string; location: string }[] = [];

  addDepartment() {
    if (this.name && this.location) {
      this.departments.push({ name: this.name, location: this.location });
      this.name = '';
      this.location = '';
    }
  }
}