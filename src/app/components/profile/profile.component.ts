import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
CurrentUserName:string|null=null;
constructor(private authservice:AuthService)
{

}
ngOnInit(): void {
  

this.authservice.currentUserNameSubject.subscribe({
  next: (value) => {
    this.CurrentUserName = value;
  }
});

}

}
