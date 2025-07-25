import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItemsSubject= new BehaviorSubject<number>(0);
  constructor(private httpclient: HttpClient) {}
  
  addProductToCart(id: string): Observable<any> {
    return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id });}

  getLoggedUserCart(): Observable<any> {
    return this.httpclient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpclient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`);
  }
  updateCartProductQuantity(id:string,count:number):Observable<any> {
return this.httpclient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count}) }


clearAllCartItems():Observable<any>
{

  return this.httpclient.delete('https://ecommerce.routemisr.com/api/v1/cart')
}

getUpdatedCartItemsNumber(){
  this.getLoggedUserCart().subscribe({
    next:(response)=>{this.numOfCartItemsSubject.next(response.numOfCartItems)}
  })
}

}

