import { Routes } from '@angular/router';
import { InventoryManagementListComponent } from './inventory-management-list/inventory-management-list.component'
import { InventoryManagementDetailComponent } from './inventory-management-list/inventory-management-detail.component'
import { InventoryManagementLoginComponent } from './inventory-management-list/inventory-management-login.component'


export const routes: Routes = [
  { path: 'login', component: InventoryManagementLoginComponent },
  { path: 'main', component: InventoryManagementListComponent },
  { path: 'detail/:id', component: InventoryManagementDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  ];
