import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule, MatSnackBarModule, MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Register {
  user = {
    name: '',
    email: '',
    password: '',
    gender: '',
    contactNumber: '',
    address: '',
    role: 'CUSTOMER',  // default
    companyName: ''
  };

  errorMsg: string = '';

  constructor(private authService: Auth, private router: Router, private snackBar: MatSnackBar) {}

  registerUser() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.snackBar.open('Registration failed. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
