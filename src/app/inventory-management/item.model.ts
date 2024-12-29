import { Category } from '../category-management/category.model';
import { Department } from '../department-management/department-management-list/department.model';

export interface Item {
  id: number;
  deviceName: string;
  deviceCondition: string;
  borrowedUntil: string | null; // Hinzufügen der borrowedUntil-Eigenschaft
  borrowedByID: string | null; // Hinzufügen der borrowedByID-Eigenschaft
  borrowDuration: string | null; // Hinzufügen der borrowDuration-Eigenschaft
  loanDuration: string | null; // Hinzufügen der loanDuration-Eigenschaft
  category: Category;
  department: Department;
}