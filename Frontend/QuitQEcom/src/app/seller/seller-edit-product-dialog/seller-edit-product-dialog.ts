import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-seller-edit-product-dialog',
    standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatSelectModule, MatListModule, MatExpansionModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './seller-edit-product-dialog.html',
  styleUrl: './seller-edit-product-dialog.css'
})
export class SellerEditProductDialog implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  imagePreview: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
        private categoryService: CategoryService,
    private dialogRef: MatDialogRef<SellerEditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
    this.productForm = this.fb.group({
      productId: [product.productId],
      productName: [product.productName, Validators.required],
      price: [product.price, [Validators.required, Validators.min(1)]],
      stock: [product.stock, [Validators.required, Validators.min(0)]],
      description: [product.description],
      imageUrl: [product.imageUrl || ''],
      catId: [product.category?.catId, Validators.required]
    });
        this.imagePreview = product.imageUrl || '';
  }

   ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => alert('Failed to load categories')
    });
  }

   previewImage(url: string): void {
    this.imagePreview = url;
  }

  updateProduct(): void {
    const updatedProduct = {
  productId: this.productForm.value.productId,
  productName: this.productForm.value.productName,
  price: this.productForm.value.price,
  stock: this.productForm.value.stock,
  description: this.productForm.value.description,
  imageUrl: this.productForm.value.imageUrl,
  category: { catId: this.productForm.value.catId },
  seller: {
    user: {
      userId: this.product.seller?.user?.userId
    }
  }
};

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.dialogRef.close(true);
      },
error: (err) => {
  console.error('Update error', err);
  alert('Failed to update product: ' + (err?.error?.message || 'Unknown error'));
}
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}


