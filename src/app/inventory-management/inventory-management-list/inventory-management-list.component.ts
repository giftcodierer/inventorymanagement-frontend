import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Department } from '../../department-management/department-management-list/department.model';


interface Item {
  id: number;
  deviceName: string;
  deviceCondition: string;
  loanDuration: string;
  testInput: string;
  department: Department; // Verknüpfung zu Department
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
    { id: 1, deviceName: 'Device 1', deviceCondition: 'New', loanDuration: '1 week', testInput: 'Test 1', department: { id: 1, name: 'IT', location: 'Building A' } },
    { id: 2, deviceName: 'Device 2', deviceCondition: 'Used', loanDuration: '2 weeks', testInput: 'Test 2', department: { id: 2, name: 'HR', location: 'Building B' } },
    { id: 3, deviceName: 'Device 3', deviceCondition: 'Refurbished', loanDuration: '3 weeks', testInput: 'Test 3', department: { id: 3, name: 'Finance', location: 'Building C' } }
  ];

  selectedItem: Item | null = null;
  selectedItems: Item[] = [];
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
      this.router.navigate(['/detail', item.id]);
    }
  }

  copyItem(item: Item | null) {
    if (item) {
      console.log('Kopieren', item);
    }
  }

  deleteItem(item: Item | null) {
    if (item) {
      console.log('Löschen', item);
    }
  }

  loanSelectedItems() {
    console.log('Ausgewählte Geräte ausleihen', this.selectedItems);
    // Hier können Sie die Logik zum Ausleihen der ausgewählten Geräte hinzufügen
  }
}