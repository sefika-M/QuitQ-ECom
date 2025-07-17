import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './customer-cart.html',
  styleUrl: './customer-cart.css'
})
export class CustomerCart implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;
  userId: number = Number(localStorage.getItem('userId'));

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartByUser(this.userId).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: () =>
        this.snackBar.open('Failed to load cart.', 'Close', { duration: 3000 })
    });
  }

  updateQuantity(item: any, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(item.cartId);
    } else {
      this.cartService.updateQuantity(item.cartId, quantity).subscribe({
        next: () => this.loadCart(),
        error: () =>
          this.snackBar.open('Failed to update quantity.', 'Close', { duration: 3000 })
      });
    }
  }
  
  onQuantityChange(event: Event, item: any) {
  const input = event.target as HTMLInputElement;
  const value = Number(input.value);
  this.updateQuantity(item, value);
}


  removeItem(cartId: number) {
    this.cartService.removeItem(cartId).subscribe({
      next: () => this.loadCart(),
      error: () =>
        this.snackBar.open('Failed to remove item.', 'Close', { duration: 3000 })
    });
  }

  calculateTotal() {
    this.totalCost = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  checkout() {
  this.router.navigate(['/customer/checkout']); 
  }
}
