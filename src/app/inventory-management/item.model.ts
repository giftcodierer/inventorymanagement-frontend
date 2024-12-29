import { Category } from '../category-management/category.model';
import { Department } from '../department-management/department-management-list/department.model';

export interface Item {
  id: number;
  deviceName: string;
  deviceCondition: string;
  loanDuration: string;
  category: Category;
  department: Department;
}