import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../interfaces/cart-response';
import { WishlistService } from '../../services/wishlist.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private cartService = inject(CartService)
  private wishListService = inject(WishlistService)
  productId:string|null =null;
  productDetails:Product|null =null
constructor(private activatedRoute:ActivatedRoute, private productservice:ProductsService){}

 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
     autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(params)=>{this.productId=params.get('id')

if(this.productId!=null){
this.productservice.getProductDetails(this.productId).subscribe({
  next:(response)=>{
    this.productDetails= response.data
  }
})
}



    }
  })
}
addToCart(id:string){
this.cartService.addProductToCart(id).subscribe({
  next:(response:CartResponse)=>{this.cartService.numOfCartItemsSubject.next(response.numOfCartItems)},
  
  
})
}
addToWishList(productId:string){
  this.wishListService.addProductToWishList(productId).subscribe({
    next:()=>{}
  })

}


}
