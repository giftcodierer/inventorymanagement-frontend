import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { DepartmentService } from '../../services/department.service';
import { AuthService } from '../../services/auth.service';
import { Item } from '../item.model';
import { Category } from '../../category-management/category.model';
import { Department } from '../../department-management/department-management-list/department.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-management-detail',
  standalone: true,
  templateUrl: './inventory-management-detail.component.html',
  styleUrls: ['./inventory-management-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class InventoryManagementDetailComponent implements OnInit {
  id: number | null = null;
  deviceName: string = '';
  deviceCondition: string = '';
  loanDuration: string = '';
  categoryId: number | null = null;
  departmentId: number | null = null;
  categories: Category[] = [];
  departments: Department[] = [];
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private departmentService: DepartmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getRole(); // Benutzerrolle abrufen

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.itemService.getItem(this.id).subscribe((item: Item) => {
          this.deviceName = item.deviceName;
          this.deviceCondition = item.deviceCondition;
          this.loanDuration = item.loanDuration || '';
          this.categoryId = item.category.id;
          this.departmentId = item.department.id;
        });
      }
    });

    this.loadCategories();
    this.loadDepartments();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }

  saveEntry() {
    const item: Item = {
      id: this.id!,
      deviceName: this.deviceName,
      deviceCondition: this.deviceCondition,
      loanDuration: this.loanDuration,
      borrowedUntil: null,
      borrowedByID: null,
      borrowDuration: null,
      category: { id: this.categoryId!, name: "" },
      department: { id: this.departmentId!, name: "", location: "" }
    };

    if (this.id) {
      this.itemService.updateItem(this.id, item).subscribe(
        () => this.router.navigate(['/list']),
        error => console.error('Fehler beim Aktualisieren des Geräts', error)
      );
    } else {
      this.itemService.createItem(item).subscribe(
        () => this.router.navigate(['/list']),
        error => console.error('Fehler beim Erstellen des Geräts', error)
      );
    }
  }

  borrowDevices(): void {
    if (this.id) {
      this.router.navigate(['/borrow'], { state: { itemIds: [this.id] } });
    } else {
      alert('Gerät nicht gefunden.');
    }
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}