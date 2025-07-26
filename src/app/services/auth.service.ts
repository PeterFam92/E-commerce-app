import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/register-request';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Ensure you have jwt-decode installed


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    // Check token on service initialization
    if(localStorage.getItem('applicationToken')) {
      this.isLoggedIn.next(true);
    }
  }

  private httpClient = inject(HttpClient);
  private router = inject(Router);


  isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem('applicationToken') ? true : false);

currentUserNameSubject=new BehaviorSubject<string | null>(this.getCurrentUserName())

 
 getCurrentUserName(){
  let token = localStorage.getItem('applicationToken');
  if (token) {
    let decodedToken:any=jwtDecode(token);
    return decodedToken.name
  }
 else{
  return null
 }
  }









  signUp(registrationData: RegisterRequest): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registrationData
    );
  }

  login(loginObj: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginObj
    );
  }

  logout(): void {
    localStorage.removeItem('applicationToken'); 
    this.isLoggedIn.next(false); 
    this.currentUserNameSubject.next(null)
    this.router.navigate(['/login']); 
  }


  forgetPassword(form: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      form
    );
  }

  verifyCode(form: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      form
    );
  }


  resetPassword(form: any): Observable<any> {
    return this.httpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      form
    );
  }

updateUserPassword(form:any):Observable<any>{
  return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword' , form )
}

updateUserInfo(form:any):Observable<any>{
  return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',form)
}

}