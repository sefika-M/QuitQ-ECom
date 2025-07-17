import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SalesReport, SellerService } from '../../services/seller-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seller-sales-report',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatTableModule, MatProgressSpinnerModule, RouterModule,
    MatIconModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatListModule,
    MatExpansionModule, MatSnackBarModule
  ],
  templateUrl: './seller-sales-report.html',
  styleUrl: './seller-sales-report.css'
})
export class SellerSalesReport implements OnInit {
  displayedColumns: string[] = ['productName', 'totalQuantitySold', 'totalRevenue'];
  dataSource: SalesReport[] = [];
  loading = true;

  constructor(private sellerService: SellerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      this.snackBar.open('User ID not found', 'Close', { duration: 3000 });
      this.loading = false;
      return;
    }

    this.sellerService.getSellerByUserId(userId).subscribe({
      next: (seller) => {
        const sellerId = seller.sellerId;
        this.sellerService.getSalesReportBySeller(sellerId).subscribe({
          next: (report) => {
            this.dataSource = Array.isArray(report) ? report : [];
            if (this.dataSource.length === 0) {
              this.snackBar.open('No sales data found.', 'Close', { duration: 3000 });
            }
            this.loading = false;
          },
          error: (err) => {
            console.error('Failed to load sales report:', err);
            this.snackBar.open('Failed to load sales report.', 'Close', { duration: 3000 });
            this.loading = false;
          }
        });
      },
      error: () => {
        this.snackBar.open('Seller not found for this user.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
