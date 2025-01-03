import { Routes } from '@angular/router';

import { InventoryManagementListComponent } from './inventory-management/inventory-management-list/inventory-management-list.component';
import { InventoryManagementDetailComponent } from './inventory-management/inventory-management-detail/inventory-management-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryManagementListComponent } from './category-management/category-management-list/category-management-list.component';
import { DepartmentManagementListComponent } from './department-management/department-management-list/department-management-list.component';
import { CategoryManagementDetailComponent } from './category-management/category-management-detail/category-management-detail.component';
import { DepartmentManagementDetailComponent } from './department-management/department-management-detail/department-management-detail.component';
import { InventoryManagementLoginComponent } from './inventory-management/inventory-management-login/inventory-management-login.component';
import { BorrowedDevicesListComponent } from './borrowed-device/borrowed-devices-list/borrowed-devices-list.component';
import { BorrowDeviceComponent } from './borrowed-device/borrowed-devices/borrow-device.component';

export const routes: Routes = [
  { path: 'login', component: InventoryManagementLoginComponent },
  { path: 'list', component: InventoryManagementListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'detail/:id', component: InventoryManagementDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'detail', component: InventoryManagementDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'department/list', component: DepartmentManagementListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'department/detail/:id', component: DepartmentManagementDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'department/new', component: DepartmentManagementDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'category/list', component: CategoryManagementListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'category/new', component: CategoryManagementDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'category/detail/:id', component: CategoryManagementDetailComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'borrowed-devices', component: BorrowedDevicesListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'borrow', component: BorrowDeviceComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];