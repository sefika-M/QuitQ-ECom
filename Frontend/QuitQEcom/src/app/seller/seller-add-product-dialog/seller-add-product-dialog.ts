import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-seller-add-product-dialog',
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule,MatSelectModule, MatSnackBarModule,
    MatTableModule, MatPaginatorModule, MatSortModule,MatIconModule,MatListModule,MatExpansionModule,
    MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './seller-add-product-dialog.html',
  styleUrl: './seller-add-product-dialog.css'
})
export class SellerAddProductDialog implements OnInit {

  productForm: FormGroup;
    categories: any[] = [];
  sellerId: number = Number(localStorage.getItem('userId'));
  imagePreview: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
        private categoryService: CategoryService,
            private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SellerAddProductDialog>
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      catId: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => {
        this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 });
      }
    });
  }

  addProduct() {
    const product = {
      ...this.productForm.value,
      seller: { user: { userId: this.sellerId } },
      category: { catId: this.productForm.value.catId }
    };

    this.productService.addProduct(product).subscribe({
      next: () => {
        this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
                this.snackBar.open('Failed to add product', 'Close', { duration: 3000 });

      }
    });
  }

  close() {
    this.dialogRef.close();
  }
  previewImage(url: string) {
    this.imagePreview = url;
  }
}

