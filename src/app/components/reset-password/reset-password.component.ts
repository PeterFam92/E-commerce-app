import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent {
  private authService = inject(AuthService);

  private router = inject(Router);
  isLoading = false;
  errorResponseMessage = '';

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  handelResetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;

      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: () => {
          this.isLoading = false;

          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorResponseMessage = err.error.message;
        },
      });
    }
  }
}