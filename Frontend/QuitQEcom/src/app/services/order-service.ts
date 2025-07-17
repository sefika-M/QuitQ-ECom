import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaces
export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderRequest {
  userId: number;
  shippingAddress: string;
  paymentMode: 'COD' | 'WALLET' | 'UPI' | 'CARD';
}

export interface OrderResponse {
  orderId: number;
  totalAmount: number;
  orderStatus: string;
  orderDate: string;
  shippingAddress: string;
  orderItems: OrderItem[];
  paymentMode?: string;       
  paymentStatus?: string;   
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:9090/orders';

  constructor(private http: HttpClient) {}

  /** 🔐 Auth header with JWT */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** ✅ Place a new order (secured) */
placeOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
  const headers = this.getAuthHeaders(); // 🛡️ secure it
  return this.http.post<OrderResponse>(
    `${this.baseUrl}/placeOrder`,
    orderRequest,
    { headers }
  );
}

  /** ✅ Get orders for a user (secured) */
getOrdersByUserId(userId: number): Observable<OrderResponse[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<OrderResponse[]>(`${this.baseUrl}/getOrdersByUserId/${userId}`, {
    headers,
    responseType: 'json'
  }).pipe(catchError(this.handleError));
}


  /** 🔁 Centralized error handler */
  private handleError(error: any) {
    console.error(' OrderService Error:', error);
    return throwError(() => error);
  }
}
