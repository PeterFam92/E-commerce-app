import { Component , inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
    private authservice = inject(AuthService);
    private router = inject(Router);
  
verifyCodeForm:FormGroup=new FormGroup({
  resetCode: new FormControl('',Validators.required)
})
errorResponseMessage = '';
isLoading = false;
handelVerifyCode(){
  if(this.verifyCodeForm.valid){

this.isLoading = true;
  this.authservice.verifyCode(this.verifyCodeForm.value).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/reset-password']);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorResponseMessage = err.error.message;
    }



  })

}

}}
