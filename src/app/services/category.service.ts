import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Category } from '../category-management/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/categories'; // Backend-URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCategories(): Observable<Category[]> {
    const headers = this.getHeaders();
    return this.http.get<Category[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  getCategory(id: number): Observable<Category> {
    const headers = this.getHeaders();
    return this.http.get<Category>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  createCategory(category: Category): Observable<Category> {
    const headers = this.getHeaders();
    return this.http.post<Category>(this.apiUrl, category, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const headers = this.getHeaders();
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  deleteCategory(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }
}