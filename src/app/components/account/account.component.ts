import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import { take } from 'rxjs/operators';
import { AccountInterface } from 'src/interfaces/account';
import { UserInterface } from 'src/interfaces/user';
import { AccountServiceService } from 'src/services/account-service.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountInterface:AccountInterface;
  source: LocalDataSource;
  constructor(
    private afs: AngularFirestore,
    private authService : AuthService, 
    private accountService : AccountServiceService, 
    private router: Router
  ) { 
    var day = new Date().getDay()
    var dia = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
    var nday = new Date().getDate()
    var month = new Date().getMonth();
    var mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    var año = new Date().getFullYear();
    this.date = dia[day-1]+' '+ nday + ' de ' + mes[month]+ ' de '+ año; 
    console.log(day)
  }
  settings = {
    columns:{},
    hideSubHeader: true,
    actions: {
      columnTitle: '',
      add: false,
      edit: true,
      delete: true,
      custom: [],
      position: 'right', // left|right
    },
    edit:{
      editButtonContent: '<i class="fa fa-pen" title="Edit"></i>'
    },
    delete:{
      confirmDelete:true,
      deleteButtonContent: '<i class="fa fa-trash" title="delete"></i>'
    },
    mode: 'inline'
  }
  id: string;
  ident: string;
  user:string;
  name:string;
  curp:string;
  email:string;
  address:string;
  accounts:string;
  mountA:number;
  mountM:number;
  mountL:number;
  date: string;

  ngOnInit(): void {
  }
  searchClient(id:string){
    this.afs.collection('Clients').doc(id).valueChanges().pipe((take(1))).subscribe(querys => {
      this.detalles(querys as any)
    })
   }
   detalles(data: UserInterface){
       this.ident = data.ident;
       this.name = data.names;
       this.curp = data.curp;
       this.email = data.email
       this.address = data.address
   }
  onSubmit({value}: {value : AccountInterface }){
   value.id = this.id+this.accounts;
   value.balance = this.mountA;
   value.mountA = this.mountA;
   value.mountL = this.mountL;
   value.mountM = this.mountM;
   value.client = this.id;
   value.date = this.date;
   value.type = this.accounts;
   console.log(value)
   this.accountService.addUser(value)
   /* this.hservice.addcita(value);
   this.router.navigate(['/home']) */
 }

}
