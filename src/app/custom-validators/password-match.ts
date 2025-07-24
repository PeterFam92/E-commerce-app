




import { AbstractControl, ValidationErrors } from '@angular/forms';


export function passwordMatch(signUpForm:AbstractControl): null|ValidationErrors {

const password = signUpForm.value.password;
const rePassword = signUpForm.value.rePassword;
if (password === rePassword) {
    return null;
    
}
return {passwordMisMatch: true};
} 
