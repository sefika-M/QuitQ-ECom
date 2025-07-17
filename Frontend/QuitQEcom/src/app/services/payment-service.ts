import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:9090/payment';

  constructor(private http: HttpClient) {}

  /** Get current wallet balance for user */
  getWalletBalance(userId: number): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(`${this.baseUrl}/walletBalance/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  /** Recharge wallet for a given user */
  rechargeWallet(userId: number, amount: number): Observable<{ message: string }> {
  const headers = this.getAuthHeaders();
  return this.http.put<{ message: string }>(
    `${this.baseUrl}/recharge?userId=${userId}&amount=${amount}`,
    {},
    { headers }
  ).pipe(catchError(this.handleError));
}


  /** Helper: Build Authorization headers */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Centralized error handling */
  private handleError(error: any) {
    console.error('PaymentService Error:', error);
    return throwError(() => error);
  }
}
