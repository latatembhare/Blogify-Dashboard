import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth,private toaster:ToastrService,private route:Router) { }
  loggedIn :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLogGuard :boolean = false
  login(email:string,password:string){
       this.afAuth.signInWithEmailAndPassword(email,password).then((logRef)=>{
        this.toaster.success('Logged in succesfully')
        this.loaduser()
        this.loggedIn.next(true)
        this.isLogGuard = true
        this.route.navigate(['/'])
       }).catch(e=>{
        this.toaster.warning(e)
       })
  }
  loaduser(){
    this.afAuth.authState.subscribe(user=>{
      localStorage.setItem('user',JSON.stringify(user))
    })
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      this.toaster.success('logged out succesfully')
      localStorage.removeItem('user')
      this.loggedIn.next(false)
      this.isLogGuard = false
     this.route.navigate(['/login'])
    })
  }

  isLoggedIn(){
  return this.loggedIn.asObservable()
  }
}
