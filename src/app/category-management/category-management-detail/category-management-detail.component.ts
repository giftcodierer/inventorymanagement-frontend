import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        // Hier können Sie die Logik zum Laden der Daten basierend auf der ID hinzufügen
        // Beispiel:
        // const category = this.loadCategoryById(this.id);
        // this.name = category.name;
      }
    });
  }

  saveCategory() {
    // Hier können Sie die Logik zum Speichern der Kategorie hinzufügen
    console.log('Kategorie speichern', {
      name: this.name
    });

    // Nach dem Speichern zur Liste zurücknavigieren
    this.router.navigate(['/categories']);
  }

  goBack() {
    // Zur Liste zurücknavigieren
    this.router.navigate(['/categories']);
  }
}