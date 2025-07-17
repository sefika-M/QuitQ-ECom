import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { MainPage } from './main-page/main-page';
import { CustomerDashboard } from './customer/customer-dashboard/customer-dashboard';
import { SellerDashboard } from './seller/seller-dashboard/seller-dashboard';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
      { path: '', component: MainPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'customer',
        canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomerDashboard },
      {
        path: 'cart',
        loadComponent: () =>
          import('./customer/customer-cart/customer-cart').then(m => m.CustomerCart)
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./customer/customer-checkout/customer-checkout').then(m => m.CustomerCheckout)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./customer/customer-orders/customer-orders').then(m => m.CustomerOrders)
      },
      {
  path: 'profile',
  loadComponent: () =>
    import('./customer/customer-profile/customer-profile').then(m => m.CustomerProfileComponent)
},
      {
        path: 'wallet',
        loadComponent: () =>
          import('./customer/customer-wallet/customer-wallet').then(m => m.CustomerWallet)
      }
    ]
  },
  {
    path: 'seller',
    component: SellerDashboard,
    canActivate: [AuthGuard]
  },
  {
  path: 'seller/orders',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./seller/seller-orders/seller-orders').then(m => m.SellerOrders)
},
  {
    path: 'seller/sales-report',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./seller/seller-sales-report/seller-sales-report').then(m => m.SellerSalesReport)
  },
  {
    path: 'admin',
    component: AdminDashboard,
        canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./admin/admin-manage-users/admin-manage-users').then(m => m.AdminManageUsers)
      },
      {
        path: 'sellers',
        loadComponent: () =>
          import('./admin/admin-manage-sellers/admin-manage-sellers').then(m => m.AdminManageSellers)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./admin/admin-manage-category/admin-manage-category').then(m => m.AdminManageCategory)
      },
      {
  path: 'summary',
  loadComponent: () =>
    import('./admin/admin-summary/admin-summary').then(m => m.AdminSummary)
},

      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]
  },

  // Fallback route (optional)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
    