import { Component,OnInit,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  numOfLoggedUserCartItems :number =0;
  numOfLoggedUserWishlistItems: number = 0; // New property for wishlist count
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService); // Inject WishlistService

isLoggedInUser = false;
currentUserName:string|null=null;
ngOnInit(): void {

  this.cartService.numOfCartItemsSubject.subscribe({
    next:(value)=>{this.numOfLoggedUserCartItems=value}
  });

  // Subscribe to wishlist count
  this.wishlistService.numOfWishlistItems.subscribe({
    next:(value)=>{this.numOfLoggedUserWishlistItems=value}
  });

  this.cartService.getUpdatedCartItemsNumber();

 this.authService.isLoggedIn.subscribe({ next:(value)=>{this.isLoggedInUser = value;}});
 this.authService.currentUserNameSubject.subscribe({
  next:(value)=>{this.currentUserName=value}
 });
}
  logout() {
    this.authService.logout();
    
  }


}
