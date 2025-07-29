import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { MessageService } from 'primeng/api';
import { take,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
private httpClient = inject(HttpClient);
private messageService=inject(MessageService);

constructor(){
this.getUpdatedWishlistItemsNumber(); 
}

wishListProductsId= new BehaviorSubject<string[]>([])  
numOfWishlistItems= new BehaviorSubject<number>(0) 

addProductToWishList(productId:string):Observable <any>
{
 return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
  productId:productId
 }).pipe(take(1),tap((res:any)=>{
  this.messageService.add({severity:'success', summary:'Product added successfully to your wishlist', detail:'The item is now in your wishlist.'})
}))
}
getUserWishList():Observable <any>
{
 return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' )
}
removeItemFromWishList(productId:string):Observable <any>
{
 return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`   ).pipe(take(1),tap((res:any)=>{
  this.messageService.add({severity:'error', summary:'Product removed successfully from your wishlist', detail:'The item has been removed from your wishlist.'})
}))
}

getUpdatedWishlistItemsNumber():void{
  this.getUserWishList().subscribe({
    next:(response)=>{
      this.wishListProductsId.next((response.data as Product[]).map((product)=>product._id))
      this.numOfWishlistItems.next(response.count)
    }
  })
}

}
