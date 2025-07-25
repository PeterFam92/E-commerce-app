import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  cartService = inject(CartService);

  loginFormObj: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });
  errorResponseMessage = '';
  isLoading = false;

  loginSubscription!: Subscription;

  handelLogin() {
    if (this.loginFormObj.valid) {
      this.isLoading = true;

      this.loginSubscription = this.authService
        .login(this.loginFormObj.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            localStorage.setItem( 'applicationToken', response.token  );
            this.authService.isLoggedIn.next(true);
            this.cartService.getUpdatedCartItemsNumber();
            this.authService.currentUserNameSubject.next(response.user.name);

            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorResponseMessage = err.error.message;
          },
        });
    }
  }

  ngOnDestroy(): void {
    // Check if the subscription actually exists before trying to unsubscribe
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
