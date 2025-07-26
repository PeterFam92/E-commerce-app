import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
private httpClient = inject(HttpClient);

constructor(){


this.getUserWishList().subscribe({
  next:(response)=>{
    this.wishListProductsId.next((response.data as Product[]).map((product)=>product._id))
  }
})





}


wishListProductsId= new BehaviorSubject<string[]>([])  

addProductToWishList(productId:string):Observable <any>
{
 return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
  productId:productId
 })
}
getUserWishList():Observable <any>
{
 return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' )
}
removeItemFromWishList(productId:string):Observable <any>
{
 return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`   )
}

}
