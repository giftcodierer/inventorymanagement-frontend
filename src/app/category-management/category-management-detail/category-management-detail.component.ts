import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../category.model';


@Component({
  selector: 'app-category-management-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-management-detail.component.html',
  styleUrls: ['./category-management-detail.component.css']
})
export class CategoryManagementDetailComponent implements OnInit {
  name: string = '';
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.categoryService.getCategory(this.id).subscribe(
          (category: Category) => {
            this.name = category.name;
          },
          error => {
            console.error('Fehler beim Laden der Kategorie', error);
          }
        );
      }
    });
  }

  saveCategory() {
    if (this.id) {
      const updatedCategory: Category = { id: this.id, name: this.name };
      this.categoryService.updateCategory(this.id, updatedCategory).subscribe(
        response => {
          this.router.navigate(['/category/list']);
        },
        error => {
          console.error('Fehler beim Aktualisieren der Kategorie', error);
        }
      );
    } else {
      const newCategory = { id: this.id ?? 0, name: this.name };
      this.categoryService.createCategory(newCategory).subscribe(
        response => {
          this.router.navigate(['/category/list']);
        },
        error => {
          console.error('Fehler beim Erstellen der Kategorie', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/category/list']);
  }
}