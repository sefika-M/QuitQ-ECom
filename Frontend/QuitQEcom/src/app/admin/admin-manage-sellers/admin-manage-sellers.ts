import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Seller, SellerService } from '../../services/seller-service';

@Component({
  selector: 'app-admin-manage-sellers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-manage-sellers.html',
  styleUrl: './admin-manage-sellers.css'
})
export class AdminManageSellers implements OnInit {
  displayedColumns: string[] = ['userId', 'name', 'email', 'company', 'delete'];
  dataSource: Seller[] = [];
  filteredSellers: Seller[] = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private sellerService: SellerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers() {
    this.sellerService.getAllSellers().subscribe({
      next: (sellers) => {
        this.dataSource = sellers;
        this.filteredSellers = [...sellers];
      },
      error: (err) => {
        console.error('Failed to fetch sellers', err);
        this.snackBar.open('Failed to load sellers', 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this seller?')) {
      this.sellerService.deleteSellerAndUser(userId).subscribe({
        next: () => {
          this.snackBar.open('Seller deleted successfully', 'Close', { duration: 3000 });
          this.loadSellers();
        },
        error: (err) => {
          console.error('Failed to delete seller', err);
          this.snackBar.open('Failed to delete seller. Make sure cascade delete is working.', 'Close', { duration: 4000 });
        }
      });
    }
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredSellers = this.dataSource.filter(s =>
      s.user.name.toLowerCase().includes(value) ||
      s.user.email.toLowerCase().includes(value) ||
      ((s.companyName ?? '') + '').toLowerCase().includes(value)
    );
  }
}
