import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private authservice:AuthService){}
  user:any
  isLoggedIn$ :Observable<boolean> | undefined
  useremail:any
  ngOnInit(): void {
    const userData: string | null = localStorage.getItem('user');
    this.isLoggedIn$ = this.authservice.isLoggedIn()
  // Log the raw user data (string) to the console
  console.log(userData);
  
  if (userData !== null) {
    // Parse the user data string into an object
    this.user = JSON.parse(userData);
    
    // Log the parsed object to the console
    console.log(this.user);
    
    // Access and log the email property from the user object
    this.useremail = this.user.email
    console.log(this.user.email);
  } else {
    console.log('No user data found in localStorage.');
  }
  }

  onLogout(){
       this.authservice.logout()
  }
}
