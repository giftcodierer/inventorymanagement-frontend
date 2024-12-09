import { Routes } from '@angular/router';
import { InventoryManagementLoginComponent } from './inventory-management/inventory-management-login/inventory-management-login.component';
import { InventoryManagementListComponent } from './inventory-management/inventory-management-list/inventory-management-list.component';
import { InventoryManagementDetailComponent } from './inventory-management/inventory-management-detail/inventory-management-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { DepartmentDetailComponent } from './department-management/department-management-detail/department-management-detail.component';
import { CategoryManagementDetailComponent } from './category-management/category-management-detail/category-management-detail.component';
import { CategoryManagementListComponent } from './category-management/category-management-list/category-management-list.component';
import { DepartmentManagementListComponent } from './department-management/department-management-list/department-management-list.component';

export const routes: Routes = [
  { path: 'login', component: InventoryManagementLoginComponent },
  { path: 'list', component: InventoryManagementListComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: InventoryManagementDetailComponent, canActivate: [AuthGuard] },
  { path: 'department/list', component: DepartmentManagementListComponent, canActivate: [AuthGuard] },
  { path: 'department/list/:id', component: DepartmentDetailComponent, canActivate: [AuthGuard] },
  { path: 'department/new', component: DepartmentDetailComponent, canActivate: [AuthGuard] },
  { path: 'category/list', component: CategoryManagementListComponent, canActivate: [AuthGuard] },
  { path: 'category/new', component: CategoryManagementDetailComponent, canActivate: [AuthGuard] },
  { path: 'category/detail/:id', component: CategoryManagementDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];