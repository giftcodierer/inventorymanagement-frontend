import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthService } from "./services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, RouterModule],
  template: `
<p-menubar [model]="items">
  <div class="header-container">
    <div class="header-title">Inventar Verwaltung</div>
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
        font-size: 1.5rem;
        font-weight: bold;
        color:rgb(0, 0, 0);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
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
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  private authStatusSub!: Subscription;

  constructor(private router: Router, private authService: AuthService) { // Inject AuthService
    this.items = [];
  }

  ngOnInit(): void {
    this.setMenuItems();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(() => {
      this.setMenuItems();
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  setMenuItems(): void {
    const role = this.authService.getRole();

    this.items = [
      {
        label: 'Menu',
        icon: 'pi pi-bars',
        items: [
          { label: 'Inventar', icon: 'pi pi-fw pi-box', routerLink: '/list' },
          ...(role === 'ADMIN' ? [
            { label: 'Kategorien', icon: 'pi pi-fw pi-list', routerLink: '/category/list' },
            { label: 'Abteilungen', icon: 'pi pi-fw pi-user', routerLink: '/department/list' }
          ] : []),
          { label: 'Ausgeliehene Geräte', icon: 'pi pi-fw pi-book', command: () => this.navigateToBorrowedDevices() },
          { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() }
        ]
      }
    ];
  }

  navigateToBorrowedDevices(): void {
    this.router.navigate(['/borrowed-devices']);
  }

  logout(): void {
    this.authService.logout(); // Call logout method from AuthService
    this.router.navigate(['/login']); // Navigate to login screen
  }
}