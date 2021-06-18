
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

import { Router } from '@angular/router';

import { UserInterface } from 'src/interfaces/user';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email= '';
  password= '';
  public isLoginClient = false;
  public isLogin = false; 
  constructor(
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
  ) { };

  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(
      (resolve) => {
        this.onLoginRedirect(this.email)
        console.log(resolve)
      }).catch((err) => {
        this.router.navigate(['/login']);
        alert('Ocurrio un error')
        console.log(err)
      })
  };
  onLoginRedirect(id:string){
    this.authService.getAuth().subscribe(user => {
      if(user){
        this.isLogin = true;
      }
    }) 
    window.close()
  }; 
}