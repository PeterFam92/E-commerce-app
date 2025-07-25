import { Component,OnInit,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  numOfLoggedUserCartItems :number =0
  private authService = inject(AuthService);
  private cartService = inject(CartService);

isLoggedInUser = false;
currentUserName:string|null=null;
ngOnInit(): void {

  this.cartService.numOfCartItemsSubject.subscribe({
    next:(value)=>{this.numOfLoggedUserCartItems=value}
  })
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
