import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { OrderService, OrderResponse } from '../../services/order-service';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-customer-orders',
    standalone: true,
     imports: [
    CommonModule,RouterModule, MatCardModule, MatExpansionModule,
    NgIf,
    NgFor,MatSnackBarModule,
    MatExpansionModule,    MatListModule,MatTableModule,
    MatIconModule,DatePipe, MatProgressSpinnerModule
  ],
  templateUrl: './customer-orders.html',
  styleUrl: './customer-orders.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class CustomerOrders implements OnInit {
   userId: number = Number(localStorage.getItem('userId'));
  orders: OrderResponse[] = [];
  displayedColumns: string[] =['productName', 'quantity', 'price', 'status'];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrdersByUserId(this.userId).subscribe({
      next: (data) => this.orders = data,
      error: () => {
        this.snackBar.open('Failed to load orders', 'Close', { duration: 3000 });
      }
    });
  }
}
