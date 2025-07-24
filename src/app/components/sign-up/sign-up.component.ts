import { Component,OnDestroy,inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordMatch } from '../../custom-validators/password-match';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent implements OnDestroy {
  private authservice = inject(AuthService);
  private router = inject(Router);

  signUpFormObj: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
    rePassword: new FormControl('', [Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)] ),

    phone: new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/),]),
  } , { validators: passwordMatch });
  errorResponseMessage = '';
  isLoading =false;
  singUpSubscription: Subscription | null = null; // Changed from '!' to allow null

  handleSignUp() {
    if (this.signUpFormObj.valid) {
      this.isLoading = true;
      this.singUpSubscription= this.authservice.signUp(this.signUpFormObj.value).subscribe({
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

  onsubmit() {
    console.log(this.signUpFormObj.value);
    // Here you can handle the form submission, e.g., send data to a server
  }

  ngOnDestroy(): void {
    // Check if the subscription actually exists before trying to unsubscribe
    if (this.singUpSubscription) {
      this.singUpSubscription.unsubscribe();
    }
  }
}
