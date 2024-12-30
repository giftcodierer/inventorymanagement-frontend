import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { ItemService } from '../../services/item.service';
import { Item } from '../item.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-inventory-management-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './inventory-management-list.component.html',
  styleUrls: ['./inventory-management-list.component.css']
})
export class InventoryManagementListComponent implements OnInit {
  items: Item[] = [];
  selectedItem: Item | null = null;
  selectedItems: Item[] = [];
  menuItems: MenuItem[];
  isAdmin: boolean = false;

  constructor(private router: Router, private itemService: ItemService, public authService: AuthService) {
    this.menuItems = [
      { label: 'Bearbeiten', icon: 'pi pi-pencil', command: () => this.editItem(this.selectedItem) },
      { label: 'Kopieren', icon: 'pi pi-copy', command: () => this.copyItem(this.selectedItem) },
      { label: 'Löschen', icon: 'pi pi-trash', command: () => this.deleteItem(this.selectedItem) }
    ];
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Fehler beim Laden der Items', error);
      }
    );
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
      const { id, ...newItem } = item; 
      this.itemService.createItem(newItem as Item).subscribe(
        response => {
          this.loadItems(); 
        },
        error => {
          console.error('Fehler beim Kopieren des Geräts', error);
        }
      );
    }
  }

  deleteItem(item: Item | null): void {
    if (item && confirm('Sind Sie sicher, dass Sie dieses Item löschen möchten?')) {
      this.itemService.deleteItem(item.id).subscribe(
        () => {
          this.loadItems();
        },
        (error) => {
          console.error('Fehler beim Löschen des Items', error);
        }
      );
    }
  }
  
  borrowDevices(): void {
    if (this.selectedItems.length > 0) {
      const itemIds = this.selectedItems.map(item => item.id);
      this.router.navigate(['/borrow'], { state: { itemIds } });
    } else {
      alert('Bitte wählen Sie mindestens ein Gerät aus.');
    }
  }

  generateQrCode(item: Item): void {
    const url = `http://localhost:4200/detail/${item.id}`;
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

    fetch(qrCodeApiUrl)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `QRCode_${item.id}.png`;
        link.click();
      })
      .catch(error => {
        console.error('Fehler beim Generieren des QR-Codes', error);
      });
  }
}