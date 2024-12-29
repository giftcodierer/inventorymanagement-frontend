import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category-management/category.model';
import { Department } from '../../department-management/department-management-list/department.model';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { DepartmentService } from '../../services/department.service';
import { Item } from '../item.model';


@Component({
  selector: 'app-inventory-management-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-management-detail.component.html',
  styleUrls: ['./inventory-management-detail.component.css']
})
export class InventoryManagementDetailComponent implements OnInit {
  deviceName: string = '';
  deviceCondition: string = '';
  loanDuration: string = '';
  categoryId: number | null = null;
  departmentId: number | null = null;
  id: number | null = null;
  categories: Category[] = [];
  departments: Department[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.itemService.getItem(this.id).subscribe(
          (item: Item) => {
            this.deviceName = item.deviceName;
            this.deviceCondition = item.deviceCondition;
            this.loanDuration = item.loanDuration;
            this.categoryId = item.category.id;
            this.departmentId = item.department.id;
          },
          error => {
            console.error('Fehler beim Laden des Geräts', error);
          }
        );
      }
    });

    this.loadCategories();
    this.loadDepartments();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      error => {
        console.error('Fehler beim Laden der Kategorien', error);
      }
    );
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

  saveEntry() {
    const item = {
      deviceName: this.deviceName,
      deviceCondition: this.deviceCondition,
      loanDuration: this.loanDuration,
      category: { id: this.categoryId! },
      department: { id: this.departmentId! }
    };
    if (this.id) {
      this.itemService.updateItem(this.id, item as Item).subscribe(
        response => {
          console.log('Gerät erfolgreich aktualisiert', response);
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Fehler beim Aktualisieren des Geräts', error);
        }
      );
    } else {
      this.itemService.createItem(item as Item).subscribe(
        response => {
          console.log('Gerät erfolgreich erstellt', response);
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Fehler beim Erstellen des Geräts', error);
        }
      );
    }
  }

  goBack() {
    // Zur Liste zurücknavigieren
    this.router.navigate(['/list']);
  }
}