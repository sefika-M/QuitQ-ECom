import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-customer-wallet',
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule,MatIconModule, 
    MatTableModule, MatPaginatorModule, MatSelectModule, MatListModule, MatExpansionModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './customer-wallet.html',
  styleUrl: './customer-wallet.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class CustomerWallet implements OnInit {
  balance: number = 0;
  rechargeAmount: number = 0;
  paymentMethod: string = 'UPI';
  userId: number = Number(localStorage.getItem('userId'));
  paymentMethods: string[] = ['UPI', 'Card', 'NetBanking'];

  constructor(private paymentService: PaymentService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance() {
    this.paymentService.getWalletBalance(this.userId).subscribe({
      next: (res) => this.balance = res,
      error: () => this.snackBar.open('Failed to fetch balance', 'Close', { duration: 3000 })
    });
  }

  rechargeWallet() {
  if (this.rechargeAmount > 0) {
    this.paymentService.rechargeWallet(this.userId, this.rechargeAmount).subscribe({
      next: (res) => {
        this.snackBar.open('Recharge successful!', 'Close', { duration: 3000 });
        this.loadBalance();
        this.rechargeAmount = 0;
      },
      error: (err) => {
        console.error('Recharge error:', err);
        this.snackBar.open('Recharge failed. Try again.', 'Close', { duration: 3000 });
      }
    });
  } else {
    this.snackBar.open('Enter a valid amount', 'Close', { duration: 3000 });
  }
}

}





