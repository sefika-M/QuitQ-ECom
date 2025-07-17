import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CartItem {
  cartId: number;
  product: {
    productId: number;
    productName: string;
    price: number;
    imageUrl: string;
    description?: string;
    stock?: number;
  };
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private baseUrl = 'http://localhost:9090/cart';

constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  
 if (!token) {
    console.warn('No token found in localStorage.');
    return new HttpHeaders(); // Return empty to avoid error
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add?userId=${userId}&productId=${productId}&quantity=${quantity}`, {}, {
      headers: this.getAuthHeaders() }    
    ).pipe(catchError(this.handleError));
  }

  getCartByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()}
        ).pipe(catchError(this.handleError));
  }

  updateQuantity(cartId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateQuantity?cartId=${cartId}&quantity=${quantity}`, {}, {
      headers: this.getAuthHeaders() }
        ).pipe(catchError(this.handleError));
  }

  removeItem(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${cartId}`, {
      headers: this.getAuthHeaders()}
        ).pipe(catchError(this.handleError));
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear/${userId}`, {
      headers: this.getAuthHeaders()}
        ).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('🛑 CartService Error:', error);
    return throwError(() => error);
  }
}

