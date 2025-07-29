import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient,private messageService:MessageService,private router:Router) { }


checkOutSession(form:any ,cartId:string):Observable<any>
{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-app-taupe-kappa.vercel.app`,{shippingAddress:form}).pipe(take(1),tap((res:any)=>{
    this.messageService.add({severity:res.status=='success'?'success':'error', summary:res.status=='success'?'Redirecting to payment gateway':'Online payment failed', detail:res.message});
    if(res.status=='success'){
      window.open(res.session.url)
    }
  }))
}
cashOrder(form:any ,cartId:string):Observable<any> {
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,{shippingAddress:form}).pipe(take(1),tap((res:any)=>{
    this.messageService.add({severity:res.status=='success'?'success':'error', summary:res.status=='success'?'Cash order placed successfully':'Cash order failed', detail:res.message});
    if(res.status=='success'){
      this.router.navigate(['/allorders'])
    }
  }))
}

getUserOrders(userId:string):Observable<any>{
  return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
}
}
