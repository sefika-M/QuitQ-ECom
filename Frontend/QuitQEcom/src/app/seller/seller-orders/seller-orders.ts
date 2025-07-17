import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller-service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seller-orders',
  imports: [CommonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, FormsModule, RouterModule,
    MatIconModule,MatListModule, MatSelectModule, MatExpansionModule, MatSnackBarModule
  ],
  templateUrl: './seller-orders.html',
  styleUrl: './seller-orders.css'
})
export class SellerOrders implements OnInit {
  displayedColumns: string[] = ['orderId', 'productName', 'quantity', 'price', 'status', 'paymentStatus', 'customerName', 'shippingAddress'];
  dataSource: any[] = [];

    updatingStatusMap: { [orderId: number]: boolean } = {}; 

  constructor(private sellerService: SellerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  const userId = Number(localStorage.getItem('userId'));

  this.sellerService.getSellerByUserId(userId).subscribe({
    next: (seller) => {
      const sellerId = seller.sellerId;

      this.sellerService.getOrdersBySeller(sellerId).subscribe({
        next: (orders) => { this.dataSource = orders;
          if (orders.length === 0) {
              this.snackBar.open('No orders found for your products.', 'Close', { duration: 3000 });
            }
          },
        error: () => this.snackBar.open('Failed to load seller orders', 'Close', { duration: 3000 })
      });
    },
    error: () => {
      this.snackBar.open('Failed to fetch seller info', 'Close', { duration: 3000 });
    }
  });
}


  updateStatus(orderItem: any) {
        this.updatingStatusMap[orderItem.orderId] = true;  // Disable the dropdown

    this.sellerService.updateOrderItemStatus(orderItem.orderItemId, orderItem.status)
.subscribe({
      next: () => {
        this.snackBar.open(`Status updated to ${orderItem.status}`, 'Close', { duration: 3000 });
                this.updatingStatusMap[orderItem.orderId] = false;

      },
      error: () => {
        this.snackBar.open('Failed to update status', 'Close', { duration: 3000 });
                this.updatingStatusMap[orderItem.orderId] = false;

      }
    });
  }
}


