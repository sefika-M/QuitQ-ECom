import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Optional: strongly-typed user model
export interface User {
  userId: number;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  contactNumber?: string;
  address?: string;
  companyName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  /** Fetch all users */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`)
      .pipe(catchError(this.handleError));
  }

  /** 🔍 Get user details by ID */
getUserById(userId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/getById/${userId}`, {
    headers: this.getAuthHeaders()
  }).pipe(catchError(this.handleError));
}

  /** Delete user by ID */
  deleteUser(userId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/deleteUser/${userId}`)
      .pipe(catchError(this.handleError));
  }

  /** Central error handler */
  private handleError(error: any) {
    console.error('UserService Error:', error);
    return throwError(() => error);
  }
}
