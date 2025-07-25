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
 
})

 }

 deleteCartItem(id:string){
  this.cartservice.removeSpecificCartItem(id).subscribe({
    next:(response:CartResponse)=>{ this.cartDetails=response;
      this.cartservice.numOfCartItemsSubject.next(response.numOfCartItems)
    },

  })
 }

 updateProductQuantity(id:string,count:number){
  this.cartservice.updateCartProductQuantity(id,count).subscribe({
    next:(response)=>{this.cartDetails=response;
      this.cartservice.numOfCartItemsSubject.next(response.numOfCartItems)
    },
   
  })
 }
clearCartItems(){
  this.cartservice.clearAllCartItems().subscribe({
    next:()=>{this.cartDetails=null;
      this.cartservice.numOfCartItemsSubject.next(0)
    }
  })
}

}
