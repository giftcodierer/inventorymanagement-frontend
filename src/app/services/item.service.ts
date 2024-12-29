import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Item } from '../inventory-management/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8080/items'; // Backend-URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getItems(): Observable<Item[]> {
    const headers = this.getHeaders();
    return this.http.get<Item[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  getItem(id: number): Observable<Item> {
    const headers = this.getHeaders();
    return this.http.get<Item>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  getItemsByIds(ids: number[]): Observable<Item[]> {
    const headers = this.getHeaders();
    return this.http.post<Item[]>(`${this.apiUrl}/by-ids`, { ids }, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }


  createItem(item: Item): Observable<Item> {
    const headers = this.getHeaders();
    return this.http.post<Item>(this.apiUrl, item, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  updateItem(id: number, item: Item): Observable<Item> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item, { headers });
  }

  deleteItem(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim HTTP-Aufruf:', error);
        throw error;
      })
    );
  }

  borrowMultipleItems(borrowData: { itemIds: number[]; borrowDuration: string; token: string }): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.apiUrl}/borrow-multiple`, borrowData, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim Ausleihen der Geräte', error);
        throw error;
      })
    );
  }

  borrowItem(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/${id}/borrow`, {}, { headers }).pipe(
      catchError((error) => {
        console.error('Fehler beim Ausleihen des Geräts', error);
        throw error;
      })
    );
  }

  getBorrowedDevicesByUser(userId: string): Observable<Item[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Item[]>(`${this.apiUrl}/borrowed?userId=${userId}`, { headers });
  }

  returnItem(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/return/${id}`, {}, { headers });
  }
}