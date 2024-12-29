import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Department } from '../department-management/department-management-list/department.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/departments'; // Backend-URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getDepartments(): Observable<Department[]> {
    const headers = this.getHeaders();
    return this.http.get<Department[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  getDepartment(id: number): Observable<Department> {
    const headers = this.getHeaders();
    return this.http.get<Department>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  createDepartment(department: Department): Observable<Department> {
    const headers = this.getHeaders();
    return this.http.post<Department>(this.apiUrl, department, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    const headers = this.getHeaders();
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  deleteDepartment(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }
}