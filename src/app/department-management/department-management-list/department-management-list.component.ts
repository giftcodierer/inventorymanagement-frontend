import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Department } from './department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './department-management-list.component.html',
  styleUrls: ['./department-management-list.component.css']
})
export class DepartmentManagementListComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  selectedDepartments: Department[] = [];
  menuItems: MenuItem[];

  constructor(private router: Router, private departmentService: DepartmentService) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.editDepartment(this.selectedDepartment) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.deleteDepartment(this.selectedDepartment) }
    ];
  }

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) => {
        this.departments = data;
      },
      error => {
        console.error('Fehler beim Laden der Abteilungen', error);
      }
    );
  }

  createDepartment() {
    this.router.navigate(['/department/new']);
  }

  editDepartment(department: Department | null) {
    if (department) {
      this.router.navigate(['/department/detail', department.id]);
    }
  }

  deleteDepartment(department: Department | null) {
    if (department && department.id) {
      this.departmentService.deleteDepartment(department.id).subscribe(
        () => {
          this.loadDepartments(); 
        },
        error => {
          console.error('Fehler beim Löschen der Abteilung', error);
        }
      );
    }
  }

  copyDepartment(department: Department | null) {
    if (department) {
      const { id, ...newDepartment } = department; // ID entfernen
      this.departmentService.createDepartment(newDepartment as Department).subscribe(
        response => {
          this.loadDepartments(); 
        },
        error => {
          console.error('Fehler beim Kopieren der Abteilung', error);
        }
      );
    }
  }

  onCopy(department: Department) {
    this.copyDepartment(department);
  }
}