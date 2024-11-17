import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

interface Item {
  id: number;
  deviceName: string;
  deviceCondition: string;
  loanDuration: string;
  testInput: string;
  department: string;
}

@Component({
  selector: 'app-inventory-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './inventory-management-list.component.html',
  styleUrls: ['./inventory-management-list.component.css']
})
export class InventoryManagementListComponent {
  items: Item[] = [
    { id: 1, deviceName: 'Device 1', deviceCondition: 'New', loanDuration: '1 week', testInput: 'Test 1', department: 'IT' },
    { id: 2, deviceName: 'Device 2', deviceCondition: 'Used', loanDuration: '2 weeks', testInput: 'Test 2', department: 'HR' },
    { id: 3, deviceName: 'Device 3', deviceCondition: 'Refurbished', loanDuration: '3 weeks', testInput: 'Test 3', department: 'Finance' }
  ];

  selectedItem: Item | null = null;
  menuItems: MenuItem[];

  constructor(private router: Router) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.editItem(this.selectedItem) },
      { label: 'Kopieren', icon: 'pi pi-copy', command: () => this.copyItem(this.selectedItem) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.deleteItem(this.selectedItem) }
    ];
  }

  createEntry() {
    this.router.navigate(['/detail']);
  }

  editItem(item: Item | null) {
    if (item) {
      console.log('Bearbeiten', item);
      // Hier können Sie die Logik zum Bearbeiten des Eintrags hinzufügen
    }
  }

  copyItem(item: Item | null) {
    if (item) {
      console.log('Kopieren', item);
      // Hier können Sie die Logik zum Kopieren des Eintrags hinzufügen
    }
  }

  deleteItem(item: Item | null) {
    if (item) {
      console.log('Löschen', item);
      // Hier können Sie die Logik zum Löschen des Eintrags hinzufügen
    }
  }
}