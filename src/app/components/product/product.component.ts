import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service' ;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
@Input({ required: true })product!:Product;
cartService =inject(CartService)

getTwoWords(str:string){
  return str.split(" ",2).join(" ")
}
addToCart(id:string){
this.cartService.addProductToCart(id).subscribe({
  next:(Response)=>{this.cartService=Response},
  error:(err)=>{}
})
}

}
