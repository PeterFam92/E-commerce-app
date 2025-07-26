import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-userinfo',
  templateUrl: './edit-userinfo.component.html',
  styleUrl: './edit-userinfo.component.css'
})
export class EditUserinfoComponent {
  authService = inject(AuthService);

  editUserInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/),]),
  });
  errorResponseMessage = '';
  isLoading = false;

  handleEditUserInfo() {
    this.isLoading = true;
    if (this.editUserInfoForm.valid) {
      this.authService.updateUserInfo(this.editUserInfoForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.errorResponseMessage = 'User information updated successfully!'; 
        },
        error: (err) => {
          this.isLoading = false;
          this.errorResponseMessage = err.error.message;
        }
      });
    }
  }
}
