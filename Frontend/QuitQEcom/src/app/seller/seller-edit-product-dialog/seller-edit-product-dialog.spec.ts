import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seller-edit-product-dialog',
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
    private snackBar: MatSnackBar,
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
      next: (res) => this.categories = res,
      error: () => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    });
  }

  updateProduct() {
    const updatedProduct = {
      ...this.productForm.value,
      category: { catId: this.productForm.value.catId },
      seller: this.product.seller
    };

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => {
        this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Failed to update product', 'Close', { duration: 3000 });
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
