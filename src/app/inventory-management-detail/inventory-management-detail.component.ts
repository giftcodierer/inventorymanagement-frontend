import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-management-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-management-detail.component.html',
  styleUrls: ['./inventory-management-detail.component.css']
})
export class InventoryManagementDetailComponent {
  deviceName: string = '';
  deviceCondition: string = '';
  loanDuration: string = '';
  testInput: string = '';
  department: string = '';

  constructor(private router: Router) {}

  saveEntry() {
    // Hier können Sie die Logik zum Speichern des Eintrags hinzufügen
    console.log('Eintrag speichern', {
      deviceName: this.deviceName,
      deviceCondition: this.deviceCondition,
      loanDuration: this.loanDuration,
      testInput: this.testInput,
      department: this.department
    });

    // Nach dem Speichern zur Liste zurücknavigieren
    this.router.navigate(['/list']);
  }

  goBack() {
    // Zur Liste zurücknavigieren
    this.router.navigate(['/list']);
  }
}