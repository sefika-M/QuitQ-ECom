import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Optional interfaces
// seller.model.ts
export interface Seller {
  sellerId: number;
  companyName: string;
  user: {
    userId: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}


export interface OrderItem {
  orderItemId: number; 
  orderId: number;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  paymentStatus: string;
  customerName: string;
  shippingAddress: string;
}


export interface SalesReport {
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = 'http://localhost:9090/orders';

  constructor(private http: HttpClient) {}

  /** Get all order items related to a specific seller */
  getOrdersBySeller(sellerId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/getOrderItemsBySellerId/${sellerId}`)
      .pipe(catchError(this.handleError));
  }

  /** Update status of an individual order item */
  updateOrderItemStatus(orderItemId: number, status: string) {
  return this.http.put(`http://localhost:9090/orders/updateOrderItemStatus?orderItemId=${orderItemId}&status=${status}`, null, {
    responseType: 'text'
  });
}

  /** Fetch sales report for a seller */
  getSalesReportBySeller(sellerId: number): Observable<SalesReport[]> {
  return this.http.get<SalesReport[]>(`http://localhost:9090/orders/sellerSalesReport/${sellerId}`)
    .pipe(catchError(this.handleError));
}


  /** ✅ Get seller by userId */
getSellerByUserId(userId: number): Observable<Seller> {
  return this.http.get<Seller>(`http://localhost:9090/sellers/getByUserId/${userId}`)
    .pipe(catchError(this.handleError));
}

getAllSellers(): Observable<Seller[]> {
  return this.http.get<Seller[]>('http://localhost:9090/sellers/all')
    .pipe(catchError(this.handleError));
}

deleteSellerAndUser(userId: number) {
  return this.http.delete(`http://localhost:9090/sellers/delete/${userId}`, {
    responseType: 'text'
  });
}

  /** Centralized error logging */
  private handleError(error: any) {
    console.error(' SellerService Error:', error);
    return throwError(() => error);
  }
}
