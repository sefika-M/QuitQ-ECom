import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../services/cart-service';
import { PaymentService } from '../../services/payment-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, MatCardModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatSnackBarModule,
    MatListModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class CustomerDashboard implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['imageUrl', 'productName', 'description', 'price', 'category', 'companyName'];
  dataSource = new MatTableDataSource<any>([]);
  filteredProducts: any[] = [];
  walletBalance: number = 0;
  userId: number = Number(localStorage.getItem('userId'));

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.getWalletBalance();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.content || data;
        this.filteredProducts = this.dataSource.data;
      },
      error: () => {
        this.snackBar.open('Failed to load products', 'Close', { duration: 3000 });
      }
    });
  }

  getWalletBalance() {
    this.paymentService.getWalletBalance(this.userId).subscribe({
      next: (balance: number) => this.walletBalance = balance,
      error: () => {
        this.walletBalance = 0;
        this.snackBar.open('Wallet fetch failed', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProducts = this.dataSource.data.filter((data: any) => {
      return data.productName.toLowerCase().includes(filterValue) ||
             data.category?.catName.toLowerCase().includes(filterValue);
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(this.userId, product.productId, 1).subscribe({
      next: () => {
        this.snackBar.open(`${product.productName} added to cart!`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 });
      }
    });
  }

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  this.router.navigate(['/login']);
}

}
