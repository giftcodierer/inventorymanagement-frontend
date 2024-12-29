import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Department } from '../department-management/department-management-list/department.model';


interface Device {
  id: number;
  deviceName: string;
  deviceCondition: string;
  loanDuration: string;
  testInput: string;
  department: Department;
}

@Component({
  selector: 'app-borrowed-devices-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './borrowed-devices-list.component.html',
  styleUrls: ['./borrowed-devices-list.component.css']
})
export class BorrowedDevicesListComponent {
  devices: Device[] = [
    { id: 1, deviceName: 'Device 1', deviceCondition: 'New', loanDuration: '1 week', testInput: 'Test 1', department: { id: 1, name: 'IT', location: 'Building A' } },
    { id: 2, deviceName: 'Device 2', deviceCondition: 'Used', loanDuration: '2 weeks', testInput: 'Test 2', department: { id: 2, name: 'HR', location: 'Building B' } },
    { id: 3, deviceName: 'Device 3', deviceCondition: 'Refurbished', loanDuration: '3 weeks', testInput: 'Test 3', department: { id: 3, name: 'Finance', location: 'Building C' } }
  ];

  selectedDevice: Device | null = null;
  selectedDevices: Device[] = [];
  menuItems: MenuItem[];

  constructor(private router: Router) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.editDevice(this.selectedDevice) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.deleteDevice(this.selectedDevice) }
    ];
  }

  editDevice(device: Device | null) {
    if (device) {
      this.router.navigate(['/detail', device.id]);
    }
  }

  deleteDevice(device: Device | null) {
    if (device) {
      console.log('Löschen', device);
    }
  }
}