import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, RouterModule],
  template: `
    <p-menubar [model]="items">
      <div class="header-container">
        <div class="header-title">Inventar Verwaltung</div>
        <div class="header-buttons">
        </div>
      </div>
    </p-menubar>
  `,
  styles: [
    `
      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .header-title {
        flex: 1;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #007bff;
      }

      .header-buttons {
        display: flex;
        align-items: center;
      }

      .p-menubar {
        background-color: white;
        border: none;
        box-shadow: none;
      }

      .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
        color: #007bff;
      }

      .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
        background-color: #e0e0e0;
      }

      .p-button-text {
        color: #007bff;
      }

      .p-button-text:hover {
        background-color: #e0e0e0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Menu',
        icon: 'pi pi-bars',
        items: [
          { label: 'Inventar', icon: 'pi pi-fw pi-box', routerLink: '/list' },
          { label: 'Kategorien', icon: 'pi pi-fw pi-list', routerLink: '/category/list' },
          { label: 'Abteilungen', icon: 'pi pi-fw pi-user', routerLink: '/department/list' }
        ]
      }
    ];


  }

  ngOnInit() {}
}