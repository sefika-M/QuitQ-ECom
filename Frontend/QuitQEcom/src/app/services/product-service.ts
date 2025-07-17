import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Optional interface for a product
export interface Product {
  productId?: number;
  productName: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  category: {
    catId: number;
  };
  seller: {
    user: {
      userId: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:9090/products';

  constructor(private http: HttpClient) {}

  /** Fetch all products */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`)
      .pipe(catchError(this.handleError));
  }

  getProductsBySellerId(sellerId: number): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.baseUrl}/getProductsBySellerId/${sellerId}`)
    .pipe(catchError(this.handleError));
}

  /** Add a new product */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/addProduct`, product)
      .pipe(catchError(this.handleError));
  }

  /** Update existing product */
  updateProduct(product: Product): Observable<Product> {
  return this.http.put<Product>(
    `${this.baseUrl}/updateProduct/${product.productId}`, // ✅ FIXED endpoint
    product
  ).pipe(catchError(this.handleError));
}

  /** Centralized error handler */
  private handleError(error: any) {
console.error(`[ProductService] ${error.status} - ${error.statusText || ''}`, error.error || error);
    return throwError(() => error);
  }

  /** Delete a product */
deleteProduct(productId: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/delete/${productId}`)
    .pipe(catchError(this.handleError));
}

getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
}

}
