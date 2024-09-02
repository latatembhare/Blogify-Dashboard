import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService:AuthService){}
  @ViewChild('loginForm') loginForm: NgForm | any;

 onSubmit(val:any){
  this.authService.login(val.email,val.password)
 }

 setDefault(){
  const user = {
    email:'l@gmail.com',
    password :'123456'
  }
  this.loginForm.setValue(user);
 }
}
