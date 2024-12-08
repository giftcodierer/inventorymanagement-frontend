import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Category } from '../category.model';


@Component({
  selector: 'app-category-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './category-management-list.component.html',
  styleUrls: ['./category-management-list.component.css']
})
export class CategoryManagementListComponent {
  categories: Category[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' }
  ];

  selectedCategory: Category | null = null;
  menuItems: MenuItem[];

  constructor(private router: Router) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.editCategory(this.selectedCategory) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.deleteCategory(this.selectedCategory) }
    ];
  }

  createCategory() {
    this.router.navigate(['/category-detail']);
  }

  editCategory(category: Category | null) {
    if (category) {
      this.router.navigate(['/category-detail', category.id]);
    }
  }

  deleteCategory(category: Category | null) {
    if (category) {
      console.log('Löschen', category);
    }
  }
}