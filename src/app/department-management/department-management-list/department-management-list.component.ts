import { Component } from '@angular/core';
import { Department } from './department.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-management-list',
  standalone: true,
  imports: [  CommonModule, TableModule, ContextMenuModule],
  templateUrl: './department-management-list.component.html',
  styleUrl: './department-management-list.component.css'
})
export class DepartmentListComponent {

  constructor(private router: Router){
    
  }

    menuItems: MenuItem[] | undefined; // Add this line to define the menuItems property

  departments: Department[] = [
    { id: 1, name: 'HR', location: 'New York' },
    { id: 2, name: 'Finance', location: 'London' },
    { id: 3, name: 'Engineering', location: 'San Francisco' }
  ];
  selectedDepartments: Department[] = [];

  onCreate() {
    console.log('Neues Department erstellen');
    this.router.navigate(['/department/new']);
  }

  onDetails(department: Department) {
    console.log('Details für:', department);
  }

  onCopy(department: Department) {
    const copied = { ...department, id: Date.now() };
    this.departments.push(copied);
  }

  onDelete(department: Department) {
    this.departments = this.departments.filter(d => d.id !== department.id);
  }

  deleteSelected() {
    this.departments = this.departments.filter(d => !this.selectedDepartments.includes(d));
    this.selectedDepartments = [];
  }
}