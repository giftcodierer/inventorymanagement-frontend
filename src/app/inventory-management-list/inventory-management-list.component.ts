import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-inventory-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule],
  templateUrl: './inventory-management-list.component.html',
  styleUrls: ['./inventory-management-list.component.css']
})
export class InventoryManagementListComponent {
  items: Item[] = [
    { id: 1, name: 'Item 1', quantity: 10, price: 100 },
    { id: 2, name: 'Item 2', quantity: 5, price: 50 },
    { id: 3, name: 'Item 3', quantity: 20, price: 200 }
  ];

  createEntry() {
    // Hier können Sie die Logik zum Erstellen eines neuen Eintrags hinzufügen
    console.log('Eintrag erstellen');
  }
}