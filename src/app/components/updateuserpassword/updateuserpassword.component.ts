import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../custom-validators/password-match';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuserpassword',
  templateUrl: './updateuserpassword.component.html',
  styleUrl: './updateuserpassword.component.css'
})
export class UpdateuserpasswordComponent {
  authService = inject(AuthService);
  router = inject(Router)

  updateUserPasswordForm: FormGroup = new FormGroup({
   currentPassword: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      password: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      rePassword: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    } , { validators: passwordMatch });
    errorResponseMessage = '';
    isLoading =false;
    handleupdateUserPassword(){
      this.isLoading = true;
      if (this.updateUserPasswordForm.valid) {
        this.authService.updateUserPassword(this.updateUserPasswordForm.value).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.authService.logout();
          },
          error: (err) => {
            this.isLoading = false;
            this.errorResponseMessage = err.error.message;
           
            if (err.status === 401) {
              this.authService.logout();
            }
          }
        });
      }
    }
}
