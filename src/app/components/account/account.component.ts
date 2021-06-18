import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
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
  accountInterface: AccountInterface;
  source: LocalDataSource;

  constructor(
    private authService: AuthService,
    private accountService: AccountServiceService,
    private router: Router
  ) {
    var day = new Date().getDay()
    var dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    var nday = new Date().getDate()
    var month = new Date().getMonth();
    var mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var año = new Date().getFullYear();
    this.date = dia[day - 1] + ' ' + nday + ' de ' + mes[month] + ' de ' + año;
  }
  settings = {
    columns: {
      accounts: {
        title: 'Tipo de Cuenta',
        type: 'string'
      },
      balance: {
        title: 'Saldo Actual',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'MXN' }).format(value) }
      },
      mountL: {
        title: 'Limite de Cuenta',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'MXN' }).format(value) }
      },
      mountM: {
        title: 'Saldo Promedio ',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'MXN' }).format(value) }
      },
      date: {
        title: 'Fecha de Apertura',
        type: 'number'
      }
    },
    hideSubHeader: true,
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'transfer',
          title: 'Movimientos <i class="fa fa-share-square-o" title="entrada"></i>'
        }
      ],
      position: 'right', // left|right
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: ' Eliminar <i class="fa fa-trash" title="delete"></i>'
    },
    mode: 'inline'
  }
  id: string;
  ident: string;
  user: string;
  name: string;
  curp: string;
  email: string;
  address: string;
  accounts: string;
  mountA: number;
  mountM: number;
  mountL: number;
  date: string;
  accountID: string;
  ngOnInit(): void {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.authService.getUserData(user.email).subscribe((info: UserInterface) => {
          this.ident = info.ident;
          this.name = info.names + ' ' + info.lastname;
          this.curp = info.curp;
          this.email = info.email;
          this.address = info.address;
          this.accountService.getAll(info.ident).subscribe(x => this.source = x as any
          )

        })
      }
    });
  }
  onSubmit({ value }: { value: AccountInterface }) {
    this.accountID = this.ident + this.accounts;
    value.id = this.accountID;
    value.balance = this.mountA;
    value.mountA = this.mountA;
    value.mountL = this.mountL;
    value.mountM = this.mountM;
    value.client = this.ident;
    value.date = this.date;
    value.type = this.accounts;
    console.log(value)
    this.accountService.addAccount(value)
  }
  deleteData(event) {
    if (event.data.balance == 0) {
      if (confirm('¿Estas seguro de eliminar la cuenta?')) {
        this.accountService.deleteAccount(event.data)
        event.confirm.resolve();
      }
    }
    else {
      alert('La cuenta necesita estar en 0.00')
      event.confirm.reject();
    }
  }
  transfer(event) {
    this.router.navigate(['/transfer/' + event.data.id]);
  }
}
