import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service' ;
import { CartResponse } from '../../interfaces/cart-response';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
@Input({ required: true })product!:Product;
cartService =inject(CartService)
wishListService = inject(WishlistService)
wishListProductsIdsList :string[]=[]

ngOnInit(): void {
  this.wishListService.wishListProductsId.subscribe((idsList)=>{this.wishListProductsIdsList=idsList})
}
addToCart(id:string){
this.cartService.addProductToCart(id).subscribe({
  next:(response:CartResponse)=>{this.cartService.numOfCartItemsSubject.next(response.numOfCartItems)},
  
  
})
}

addToWishList(productId:string){
  this.wishListService.addProductToWishList(productId).subscribe({
    next: (response) => {
      this.wishListService.wishListProductsId.next(response.data);
      this.wishListService.getUpdatedWishlistItemsNumber();
    }
  })

}

isWishListProduct(id:string){
return this.wishListProductsIdsList.includes(id )
}
}
