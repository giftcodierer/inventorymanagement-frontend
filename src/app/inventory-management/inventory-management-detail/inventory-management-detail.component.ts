import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../department-management/department-management-list/department.model';

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
  testInput: string = '';
  departmentId: number | null = null;
  departments: Department[] = [
    { id: 1, name: 'IT', location: 'Building A' },
    { id: 2, name: 'HR', location: 'Building B' },
    { id: 3, name: 'Finance', location: 'Building C' }
  ];
  id: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        // Hier können Sie die Logik zum Laden der Daten basierend auf der ID hinzufügen
        // Beispiel:
        // const item = this.loadItemById(this.id);
        // this.deviceName = item.deviceName;
        // this.deviceCondition = item.deviceCondition;
        // this.loanDuration = item.loanDuration;
        // this.testInput = item.testInput;
        // this.departmentId = item.department.id;
      }
    });
  }

  saveEntry() {
    // Hier können Sie die Logik zum Speichern des Eintrags hinzufügen
    console.log('Eintrag speichern', {
      deviceName: this.deviceName,
      deviceCondition: this.deviceCondition,
      loanDuration: this.loanDuration,
      testInput: this.testInput,
      departmentId: this.departmentId
    });

    // Nach dem Speichern zur Liste zurücknavigieren
    this.router.navigate(['/list']);
  }

  goBack() {
    // Zur Liste zurücknavigieren
    this.router.navigate(['/list']);
  }
}