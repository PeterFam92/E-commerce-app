import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../interfaces/cart-response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
cartDetails:CartResponse|null=null;
product: any;
constructor(private cartservice:CartService){}


 ngOnInit(): void {
   

this.cartservice.getLoggedUserCart().subscribe({
  next:(response)=>{this.cartDetails=response},
  error :(err)=>{console.log(err)}
})

 }

 deleteCartItem(id:string){
  this.cartservice.removeSpecificCartItem(id).subscribe({
    next:(response)=>{ this.cartDetails=response},
    error:(err)=>{console.log(err);
    }
  })
 }

 updateProductQuantity(id:string,count:number){
  this.cartservice.updateCartProductQuantity(id,count).subscribe({
    next:(response)=>{this.cartDetails=response},
    error:(err)=>{console.log(err); }
  })
 }
clearCartItems(){
  this.cartservice.clearAllCartItems().subscribe({
    next:(response)=>{this.cartDetails=null}
  })
}

}
