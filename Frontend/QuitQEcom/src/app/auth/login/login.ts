import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule,  MatFormFieldModule,
  MatInputModule,MatSelectModule, MatCardModule, MatSnackBarModule,
  MatButtonModule,MatIconModule, MatListModule, MatExpansionModule,
  ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  animations: [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ])
]

})
export class Login {
   email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authService: Auth, private router: Router, private snackBar: MatSnackBar) {}

  loginUser() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token || '');
        localStorage.setItem('role', res.role); // Save role
localStorage.setItem('userId', res.userId.toString());
this.snackBar.open('Login successful!', 'Close', {
  duration: 3000,
  panelClass: ['snackbar-success']
});
        const role = res.role;

        if (res.role === 'CUSTOMER') {
        this.router.navigate(['/customer']);
      } else if (res.role === 'SELLER') {
        this.router.navigate(['/seller']);
      } else if (res.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      }

    },       
      error: (err) => {
       this.snackBar.open('Invalid credentials', 'Close', {
  duration: 3000,
  panelClass: ['snackbar-error']
});

      }
    });
}

}
