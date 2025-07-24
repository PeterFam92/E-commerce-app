import { Component,OnInit,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);

isLoggedInUser = false;
currentUserName:string|null=null;
ngOnInit(): void {
 this.authService.isLoggedIn.subscribe({ next:(value)=>{this.isLoggedInUser = value;}});
 this.authService.currentUserNameSubject.subscribe({
  next:(value)=>{this.currentUserName=value}
 })
}
  logout() {
    this.authService.logout();
    
  }


}
