import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-manage-category',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule, MatSnackBarModule,
    MatButtonModule, MatIconModule,MatSelectModule, MatListModule,  MatExpansionModule ],
  templateUrl: './admin-manage-category.html',
  styleUrl: './admin-manage-category.css'
})
export class AdminManageCategory implements OnInit {
  categories: any[] = [];
    filteredCategories: any[] = [];
  displayedColumns: string[] = ['catId', 'catName', 'actions'];
  newCatName = '';
  editId: number | null = null;
  editName: string = '';
  searchTerm: string = '';

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories();
  }
loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filteredCategories = [...data];
      },
      error: () => {
        this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 });
      }
    });
  }

  addCategory() {
    if (!this.newCatName.trim()) return;
    this.categoryService.addCategory({ catName: this.newCatName }).subscribe({
      next: () => {
        this.snackBar.open('Category added!', 'Close', { duration: 3000 });
        this.newCatName = '';
        this.loadCategories();
      },
      error: () => {
        this.snackBar.open('Failed to add category', 'Close', { duration: 3000 });
      }
    });
  }

  startEdit(cat: any) {
    this.editId = cat.catId;
    this.editName = cat.catName;
  }

  saveEdit() {
    if (this.editId == null || !this.editName.trim()) return;
    this.categoryService.updateCategory(this.editId, { catName: this.editName }).subscribe({
      next: () => {
        this.snackBar.open('Category updated!', 'Close', { duration: 3000 });
        this.editId = null;
        this.editName = '';
        this.loadCategories();
      },
      error: () => {
        this.snackBar.open('Update failed', 'Close', { duration: 3000 });
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('Delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Category deleted', 'Close', { duration: 3000 });
          this.loadCategories();
        },
        error: () => {
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  applyFilter(event: Event) {
    const val = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      c.catName.toLowerCase().includes(val)
    );
  }
}