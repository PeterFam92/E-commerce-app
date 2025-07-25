import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service' ;
import { CartResponse } from '../../interfaces/cart-response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
@Input({ required: true })product!:Product;
cartService =inject(CartService)


addToCart(id:string){
this.cartService.addProductToCart(id).subscribe({
  next:(response:CartResponse)=>{this.cartService.numOfCartItemsSubject.next(response.numOfCartItems)},
  
  
})
}

}
