import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-manage-users',
  imports: [CommonModule,FormsModule, RouterModule, MatTableModule, MatCardModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatListModule,
    MatExpansionModule, MatSnackBarModule
  ],
  templateUrl: './admin-manage-users.html',
  styleUrl: './admin-manage-users.css'
})
export class AdminManageUsers implements OnInit {
  displayedColumns: string[] = ['userId', 'name', 'email', 'role', 'delete'];
  dataSource: any[] = [];
 filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

    loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.filteredUsers = data;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: () => {
          this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
        }
      });
    }
  }

  applyFilter(event: Event) {
  const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
  if (!value) {
    this.filteredUsers = this.dataSource;
    return;
  }
  this.filteredUsers = this.dataSource.filter(u =>
    (u.name || '').toLowerCase().includes(value) ||
    (u.email || '').toLowerCase().includes(value) ||
    (u.role || '').toLowerCase().includes(value)
  );
}


}

