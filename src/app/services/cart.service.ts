import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CartResponse } from '../interfaces/cart-response';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItemsSubject= new BehaviorSubject<number>(0);
  constructor(private httpclient: HttpClient,private messageService:MessageService) {}
  
  addProductToCart(id: string): Observable<any> {
    return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id }).pipe(take(1),tap((res:any)=>{
      this.messageService.add({severity:res.status=='success'?'success':'error', summary:res.status=='success'?'Product added to cart':'Failed to add product to cart', detail:res.message})
    }))}

  getLoggedUserCart(): Observable<any> {
    return this.httpclient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpclient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`).pipe(take(1),tap((res:any)=>{
        this.messageService.add({severity:'error', summary:'Product removed from cart', detail:res.message})
      }))
  }
  updateCartProductQuantity(id:string,count:number):Observable<any> {
return this.httpclient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count}).pipe(take(1),tap((res:any)=>{
  this.messageService.add({severity:res.status=='success'?'success':'error', summary:res.status=='success'?'Cart updated':'Failed to update cart quantity', detail:res.message})
})) }


clearAllCartItems():Observable<any>
{

  return this.httpclient.delete('https://ecommerce.routemisr.com/api/v1/cart').pipe(take(1),tap((res:any)=>{
    this.messageService.add({severity:'error', summary:'Cart cleared successfully', detail:res.message})
  }))
}

getUpdatedCartItemsNumber(){
  this.getLoggedUserCart().subscribe({
    next:(response)=>{this.numOfCartItemsSubject.next(response.numOfCartItems)}
  })
}

}

