import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-userinfo',
  templateUrl: './edit-userinfo.component.html',
  styleUrl: './edit-userinfo.component.css'
})
export class EditUserinfoComponent {
 
 editUserInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/),]),
  } , );
  errorResponseMessage = '';
  isLoading =false;
handleEditUserInfo(){}

}
