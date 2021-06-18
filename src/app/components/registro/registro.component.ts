import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserInterface } from 'src/interfaces/user';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(
    private router: Router,
    private authservice: AuthService,
  ) { }
  password= '';
  type='';
  id= '';
  names= '';
  lastname= '';
  email= '';
  employee= false;
  curp= '';
  accounts?: string[]
  address?: string
  cp?: string


  ngOnInit() {
  }


  addNewUser(){
    this.authservice.registerUser(this.email,this.password)
    .then((res)=>{
      this.router.navigate(['/home'])
      console.log(res)
    }).catch(err=> console.log('err',err.message)); 
  }
  saveRegister({value}: {value: UserInterface}){
    value.id = this.email;
    value.email = this.email;
    value.address = this.address;
    value.curp = this.curp;
    value.lastname = this.lastname;
    value.employee = this.type
    value.names = this.names;
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 9; i++){
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    value.ident = result.toString();
    this.authservice.addUser(value);
  } 
}