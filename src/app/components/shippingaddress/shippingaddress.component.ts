import { Component, inject, Input, input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrl: './shippingaddress.component.css',
})
export class ShippingaddressComponent {
  orderService = inject(OrderService);
  router = inject(Router);

  @Input() id!: string;
  @Input() type!: string;

  shippingAddressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  redirectUserToPayementPage(url: string) {
    window.location.href = url;
  }

  onlinePayment() {
    if (this.type == 'cash') {
      this.orderService
        .cashOrder(this.shippingAddressForm.value, this.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/allorders']);
          },
          error: () => {
            this.router.navigate(['/cart']);
          },
        });

    }
    
    else if (this.type == 'card') {
      this.orderService
        .checkOutSession(this.shippingAddressForm.value, this.id)
        .subscribe({
          next: (response) => {
            this.redirectUserToPayementPage(response.session.url);
            
          },
        });
    }
  }
}
