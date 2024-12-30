import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ItemService } from '../../services/item.service'; 
import { AuthService } from '../../services/auth.service'; 
import { Item } from '../../inventory-management/item.model';

@Component({
  selector: 'app-borrowed-devices-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ContextMenuModule],
  templateUrl: './borrowed-devices-list.component.html',
  styleUrls: ['./borrowed-devices-list.component.css']
})
export class BorrowedDevicesListComponent implements OnInit {
  borrowedItems: Item[] = []; 

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBorrowedItems();
  }

  loadBorrowedItems(): void {
    const userId = this.authService.getUserId(); 
    if (userId) {
      this.itemService.getBorrowedDevicesByUser(userId).subscribe(
        (items) => {
          this.borrowedItems = items;
        },
        (error) => {
          console.error('Fehler beim Laden der ausgeliehenen Geräte', error);
        }
      );
    } else {
      console.error('Benutzer-ID konnte nicht abgerufen werden');
    }
  }

  returnItem(item: Item): void {
    this.itemService.returnItem(item.id).subscribe(
      () => {
        this.loadBorrowedItems(); 
        alert('Gerät erfolgreich zurückgegeben');
      },
      (error) => {
        console.error('Fehler beim Zurückgeben des Geräts', error);
      }
    );
  }
}