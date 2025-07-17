import { Component, OnInit } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderRequest, OrderService } from '../../services/order-service';

@Component({
  selector: 'app-customer-checkout',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,MatSnackBarModule,
    MatCardModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatExpansionModule
  ],
  templateUrl: './customer-checkout.html',
  styleUrl: './customer-checkout.css'
})
export class CustomerCheckout implements OnInit {
  shippingAddress: string = '';
paymentMode: 'COD' | 'WALLET' | 'UPI' | 'CARD' = 'COD';
  userId: number = Number(localStorage.getItem('userId'));

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Optionally pre-fill shipping address in the future
  }

  placeOrder() {
    const payload: OrderRequest = {
      userId: this.userId,
      shippingAddress: this.shippingAddress,
      paymentMode: this.paymentMode
    };

    this.orderService.placeOrder(payload).subscribe({
      next: () => {
        this.snackBar.open('Order placed successfully!', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
        this.router.navigate(['/customer']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to place order.', 'Close', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }
}
