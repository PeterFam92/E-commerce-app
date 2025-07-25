import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }


checkOutSession(form:any ,cartId:string):Observable<any>
{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-app-taupe-kappa.vercel.app`,{shippingAddress:form})
}
cashOrder(form:any ,cartId:string):Observable<any> {
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,{shippingAddress:form})
}

getUserOrders(userId:string):Observable<any>{
  return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
}
}
