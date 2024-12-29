import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { CategoryService } from '../../services/category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './category-management-list.component.html',
  styleUrls: ['./category-management-list.component.css']
})
export class CategoryManagementListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  selectedCategories: Category[] = [];
  menuItems: MenuItem[];

  constructor(private router: Router, private categoryService: CategoryService) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.editCategory(this.selectedCategory) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.deleteCategory(this.selectedCategory) }
    ];
  }

  ngOnInit() {
    this.loadCategories();
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

  createCategory() {
    this.router.navigate(['/category/new']);
  }

  editCategory(category: Category | null) {
    if (category) {
      this.router.navigate(['/category/detail', category.id]);
    }
  }

  deleteCategory(category: Category | null) {
    if (category && category.id) {
      this.categoryService.deleteCategory(category.id).subscribe(
        () => {
          console.log('Kategorie erfolgreich gelöscht');
          this.loadCategories(); // Liste neu laden
        },
        error => {
          console.error('Fehler beim Löschen der Kategorie', error);
        }
      );
    }
  }

  copyCategory(category: Category | null) {
    if (category) {
      const { id, ...newCategory } = category; // ID entfernen
      this.categoryService.createCategory(newCategory as Category).subscribe(
        response => {
          console.log('Kategorie erfolgreich kopiert', response);
          this.loadCategories(); // Liste neu laden
        },
        error => {
          console.error('Fehler beim Kopieren der Kategorie', error);
        }
      );
    }
  }

  onCopy(category: Category) {
    this.copyCategory(category);
  }
}