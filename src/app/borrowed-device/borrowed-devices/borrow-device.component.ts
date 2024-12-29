import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';
import { Item } from '../../inventory-management/item.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-borrow-device',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputNumberModule, ButtonModule],
  templateUrl: './borrow-device.component.html',
  styleUrls: ['./borrow-device.component.css']
})
export class BorrowDeviceComponent implements OnInit {
  items: Item[] = [];
  borrowForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.borrowForm = this.fb.group({
      borrowDays: [1, [Validators.required, Validators.min(1), Validators.max(365)]]
    });
  }

  ngOnInit(): void {
    const itemIds = history.state.itemIds;
    console.log('Received itemIds:', itemIds); // Debugging log
    if (itemIds && itemIds.length > 0) {
      this.itemService.getItemsByIds(itemIds).subscribe(
        (data) => {
          this.items = data;
          console.log('Loaded items:', this.items); // Debugging log
        },
        (error) => {
          console.error('Fehler beim Laden der Items', error);
        }
      );
    } else {
      console.log('No itemIds found, navigating back to list'); // Debugging log
      this.router.navigate(['/list']);
    }
  }

  borrowItems(): void {
    if (this.borrowForm.valid) {
      const borrowDays = this.borrowForm.get('borrowDays')?.value;
      const token = this.authService.getToken() || '';
      const borrowData = {
        itemIds: this.items.map(item => item.id),
        borrowDuration: borrowDays.toString(),
        token
      };

      console.log('Borrow data to be sent:', borrowData); // Debugging log

      // Senden Sie die Ausleihinformationen an das Backend
      this.itemService.borrowMultipleItems(borrowData).subscribe(
        () => {
          alert('Geräte erfolgreich ausgeliehen');
          this.router.navigate(['/list']);
        },
        (error) => {
          console.error('Fehler beim Ausleihen der Geräte', error);
        }
      );
    } else {
      console.log('Borrow form is invalid'); // Debugging log
    }
  }
}