import { Component, computed, signal } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isCustomerRoute = signal(false);
  walletBalance = signal<number | null>(null);

  constructor(private router: Router, private location: Location) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isCustomerRoute.set(this.router.url.startsWith('/customer'));
      if (this.isCustomerRoute()) {
        // Try to get wallet balance from localStorage (or set to null)
        const balance = localStorage.getItem('walletBalance');
        this.walletBalance.set(balance ? +balance : null);
      }
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
} 