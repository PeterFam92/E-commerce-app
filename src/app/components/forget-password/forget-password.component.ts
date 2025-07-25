import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  private authService = inject(AuthService);
   private router = inject(Router);
  
forgetPasswordForm:FormGroup = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
}
)




errorResponseMessage = ''; 
 isLoading = false;


handelForgetPassword(){
 this.isLoading = true;
  if(this.forgetPasswordForm.valid){
    this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next:()=>{
        this.isLoading=false;
        this.router.navigate(['/verify-code'], )
      },
      error :(err)=>{
        this.isLoading = false;
        this.errorResponseMessage = err.error.message;
      }

    })
  }
}




}
