import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../interfaces/cart-response';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
private wishListService = inject(WishlistService)
private cartService = inject(CartService)
allWishListProducts:Product[]=[]

ngOnInit(): void {
   this.getWishListData()
}
getWishListData(){
 this.wishListService.getUserWishList().subscribe({
    next:(response)=>{this.allWishListProducts=response.data}
  })
}

addToCart(id:string){
this.cartService.addProductToCart(id).subscribe({
  next:(response:CartResponse)=>{this.cartService.numOfCartItemsSubject.next(response.numOfCartItems)},
  
  
})
}
removeFromWishlist(id:string){
  this.wishListService.removeItemFromWishList(id).subscribe({
    next:(response)=>{
      this.wishListService.wishListProductsId.next(response.data);
      this.getWishListData();
    }

  })
}


}
