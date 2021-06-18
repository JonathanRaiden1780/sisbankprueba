import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountInterface } from 'src/interfaces/account';
import { UserInterface } from 'src/interfaces/user';
import { AccountServiceService } from 'src/services/account-service.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accountService: AccountServiceService,
    private route: ActivatedRoute
  ) {
    const day = new Date().getDay()
    const dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const nday = new Date().getDate()
    const month = new Date().getMonth();
    const mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const año = new Date().getFullYear();
    const hora = new Date().getHours()
    const min = new Date().getMinutes()
    const seg = new Date().getSeconds()
    this.dateMov = dia[day - 1] + ' ' + nday + ' de ' + mes[month] + ' de ' + año + ' ' + hora + ':' + min + ':' + seg;
  }
  id: string;
  client: string
  date: string
  send: string;
  dateMov: string;
  array: any;
  balances: number;
  balance: string;
  type: string;
  mountD: number;
  mountR: number;
  ret: string;
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.authService.getUserData(user.email).subscribe((info: UserInterface) => {
          this.client = info.ident;
          this.accountService.getDataAccount(this.client, id).subscribe(x => {
            this.array = x;
            this.id = this.array.id;
            this.balance = '$'+ (this.array.balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.type = this.array.type;
            this.client = this.array.client;
            this.date = this.array.date;
          })
        })
      }
    });
  }
  onSubmit({ value }: { value: AccountInterface }) {
    value.id = this.id;
    value.balance = this.balances + this.mountD;
    value.client = this.client;
    value.date = this.date;
    value.type = this.type;
    value.dateMov = this.dateMov;
    this.accountService.updateAccount(value)
  }
  onSubmitRet({ value }: { value: AccountInterface }) {
    value.id = this.id;
    value.balance = this.balances - this.mountR;
    value.client = this.client;
    value.date = this.date;
    value.type = this.type;
    value.dateMov = this.dateMov;
    this.accountService.updateAccount(value)
  }
}
