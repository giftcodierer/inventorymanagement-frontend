import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../department-management-list/department.model';


@Component({
  selector: 'app-department-management-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-management-detail.component.html',
  styleUrls: ['./department-management-detail.component.css']
})
export class DepartmentManagementDetailComponent implements OnInit {
  name: string = '';
  location: string = '';
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.departmentService.getDepartment(this.id).subscribe(
          (department: Department) => {
            this.name = department.name;
            this.location = department.location;
          },
          error => {
            console.error('Fehler beim Laden der Abteilung', error);
          }
        );
      }
    });
  }

  saveDepartment() {
    const department: Department = { id: this.id!, name: this.name, location: this.location };
    if (this.id) {
      this.departmentService.updateDepartment(this.id, department).subscribe(
        response => {
          this.router.navigate(['/department/list']);
        },
        error => {
          console.error('Fehler beim Aktualisieren der Abteilung', error);
        }
      );
    } else {
      this.departmentService.createDepartment(department).subscribe(
        response => {
          this.router.navigate(['/department/list']);
        },
        error => {
          console.error('Fehler beim Erstellen der Abteilung', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/department/list']);
  }
}