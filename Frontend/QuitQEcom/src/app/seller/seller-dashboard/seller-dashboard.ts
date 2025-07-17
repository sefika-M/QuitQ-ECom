import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { SellerAddProductDialog } from '../seller-add-product-dialog/seller-add-product-dialog';
import { SellerEditProductDialog } from '../seller-edit-product-dialog/seller-edit-product-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SellerService } from '../../services/seller-service';

@Component({
  selector: 'app-seller-dashboard',
    standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule,MatIconModule,MatExpansionModule,
    MatTableModule, MatPaginatorModule, MatSortModule,MatSelectModule,MatListModule, MatSnackBarModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './seller-dashboard.html',
  styleUrl: './seller-dashboard.css'
})
export class SellerDashboard implements OnInit {
  displayedColumns: string[] = ['productId', 'productName', 'price', 'stock', 'category', 'description', 'actions'];
  dataSource: any[] = [];
 filteredProducts: any[] = [];
   searchTerm: string = '';

  constructor(private productService: ProductService, private dialog: MatDialog,  private snackBar: MatSnackBar,   private sellerService: SellerService

) {}

  ngOnInit(): void {
  this.loadProducts();
}

loadProducts() {
  const userId = Number(localStorage.getItem('userId'));
  
  // Step 1: Get seller info using userId
  this.sellerService.getSellerByUserId(userId).subscribe({
    next: (seller) => {
      const sellerId = seller.sellerId;

      // Step 2: Load products using sellerId
      this.productService.getProductsBySellerId(sellerId).subscribe({
        next: (data) => {
          this.dataSource = data;
          this.filteredProducts = [...data];
        },
        error: (err) => {
          console.error('Failed to load products by sellerId', err);
          this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        }
      });
    },
    error: (err) => {
      console.error('Failed to get seller by userId', err);
      this.snackBar.open('Error fetching seller info', 'Close', { duration: 3000 });
    }
  });
}



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProducts = this.dataSource.filter(product =>
      product.productName.toLowerCase().includes(filterValue) ||
      product.category?.catName?.toLowerCase().includes(filterValue)
    );
  }
  
  openAddProductDialog() {
  const dialogRef = this.dialog.open(SellerAddProductDialog, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe((added: boolean) => {
    if (added) this.loadProducts();  // Refresh table
  });
}
openEditProductDialog(product: any) {
  const dialogRef = this.dialog.open(SellerEditProductDialog, {
    width: '500px',
    data: product
  });

  dialogRef.afterClosed().subscribe((updated: boolean) => {
    if (updated) this.loadProducts();
  });
}

markOutOfStock(product: any) {
  const updatedProduct = {
    ...product,
    stock: 0
  };

  this.productService.updateProduct(updatedProduct).subscribe({
    next: () => {
      this.snackBar.open(`Marked "${product.productName}" as out of stock`, 'Close', { duration: 3000 });
      this.loadProducts();
    },
    error: () => {
      this.snackBar.open('Failed to update stock', 'Close', { duration: 3000 });
    }
  });
}

}
