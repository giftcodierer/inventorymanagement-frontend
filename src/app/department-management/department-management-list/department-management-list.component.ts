import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Department } from './department.model';

@Component({
  selector: 'app-department-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './department-management-list.component.html',
  styleUrls: ['./department-management-list.component.css']
})
export class DepartmentManagementListComponent {
  departments: Department[] = [
    { id: 1, name: 'IT', location: 'Building A' },
    { id: 2, name: 'HR', location: 'Building B' },
    { id: 3, name: 'Finance', location: 'Building C' }
  ];

  selectedDepartment: Department | null = null;
  selectedDepartments: Department[] = [];
  menuItems: MenuItem[];

  constructor(private router: Router) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.onDetails(this.selectedDepartment) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.onDelete(this.selectedDepartment) }
    ];
  }

  onCreate() {
    this.router.navigate(['/department/new']);
  }

  onDetails(department: Department | null) {
    if (department) {
      this.router.navigate(['/department/detail', department.id]);
    }
  }

  onDelete(department: Department | null) {
    if (department) {
      console.log('Löschen', department);
    }
  }

  onCopy(department: Department) {
    console.log('Kopieren', department);
  }
}