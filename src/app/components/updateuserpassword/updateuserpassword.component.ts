import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../custom-validators/password-match';

@Component({
  selector: 'app-updateuserpassword',
  templateUrl: './updateuserpassword.component.html',
  styleUrl: './updateuserpassword.component.css'
})
export class UpdateuserpasswordComponent {

  updateUserPasswordForm: FormGroup = new FormGroup({
   currentPassword: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      password: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
     
  
      rePassword: new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/),]),
    } , { validators: passwordMatch });
    errorResponseMessage = '';
    isLoading =false;
    handleupdateUserPassword(){}
}
