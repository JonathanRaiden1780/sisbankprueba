import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UserInterface } from 'src/interfaces/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sisbank';
  public isLogin = false;
  public Logout = false;
  public employee = 'false';

  constructor(
    public authService: AuthService) {
}

ngOnInit() {
  this.authService.getAuth().subscribe( user => {
    if (user) {
      this.isLogin = false;
      this.Logout = true;
      this.authService.getUserData(user.email).subscribe( (info: UserInterface) => {
          if(info.employee == 'true'){
            this.employee = 'true';
          }
        }); 
    } else {
      this.isLogin = true;
      this.Logout = false;
    }
  });}

logout() {
  this.authService.logout();
}

log(){
  const url = require('url');
  window.open(url.format({
    pathname: 'localhost:4200/login',
    protocol: 'http:',
    slashes: true}),
    "login",
    "width=300,height=450,scrollbars=no,resizable=no,left=50,top=50");
}
}

