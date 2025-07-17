import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Optional: Define a Category interface
export interface Category {
  catId?: number;
  catName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:9090/categories';

  constructor(private http: HttpClient) {}

  /** Get all categories */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  /** Add a new category */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/add`, category)
      .pipe(catchError(this.handleError));
  }

  /** Update a category */
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/update/${id}`, category)
      .pipe(catchError(this.handleError));
  }

  /** Delete a category */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Centralized error handling */
  private handleError(error: any) {
    console.error(' CategoryService Error:', error);
    return throwError(() => error);
  }
}
