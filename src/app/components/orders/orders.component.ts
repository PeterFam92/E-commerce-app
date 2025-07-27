import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  authService = inject(AuthService);
  orderService = inject(OrderService);

  userOrders: any[] = [];
  isLoading: boolean = false;
  errorResponseMessage: string = '';

  ngOnInit(): void {
    this.loadUserOrders();
  }

  loadUserOrders(): void {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    if (userId) {
      this.orderService.getUserOrders(userId).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response && response.length > 0) {
            this.userOrders = response;
            this.errorResponseMessage = '';
          } else {
            this.userOrders = [];
            this.errorResponseMessage = 'No orders found for this user.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorResponseMessage = 'Failed to load orders: ' + (err.error.message || err.message);
        }
      });
    } else {
      this.isLoading = false;
      this.errorResponseMessage = 'User not logged in or user ID not found.';
    }
  }
}
