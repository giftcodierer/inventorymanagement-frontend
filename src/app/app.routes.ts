import { Routes } from '@angular/router';
import { InventoryManagementLoginComponent } from './inventory-management-login/inventory-management-login.component';
import { InventoryManagementListComponent } from './inventory-management-list/inventory-management-list.component';
import { InventoryManagementDetailComponent } from './inventory-management-detail/inventory-management-detail.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: InventoryManagementLoginComponent },
  { path: 'list', component: InventoryManagementListComponent, canActivate: [AuthGuard]},
  { path: 'detail', component: InventoryManagementDetailComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  ];
