import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountInterface } from 'src/interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  accountClientCollection: AngularFirestoreCollection<AccountInterface>;
  accountCollection: AngularFirestoreCollection<AccountInterface>;
  user: Observable<firebase.User>;
  accountDoc: AngularFirestoreDocument<AccountInterface>;
  accountObs: Observable<AccountInterface[]>;
  constructor(
    private afs: AngularFirestore

  ) {
    this.accountCollection = this.afs.collection('Clients', ref => ref);
  }
  addAccount(accountData: AccountInterface) {
    this.accountCollection.doc(accountData.client).collection('Accounts').doc(accountData.id).set(accountData);
  }
  //Actualizar Cuentas
  deleteAccount(registerData: AccountInterface) {
    this.accountDoc = this.afs.doc('Clients/' + registerData.client + '/Accounts/' + registerData.id);
    this.accountDoc.delete();
  }
  //Actualizar Cuentas
  updateAccount(registerData: AccountInterface) {
    this.accountDoc = this.afs.doc('Clients/' + registerData.client + '/Accounts/' + registerData.id);
    this.accountDoc.update(registerData).then(res => {
     res = alert('Cuenta Actualizada')}).catch(err=>{
       err = console.log(err);
     });
  }
  //Todas las cuentas
  getAll(id: string): Observable<AccountInterface[]> {
    this.accountClientCollection = this.afs.collection('Clients').doc(id).collection('Accounts', ref => ref);

    this.accountObs = this.accountClientCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as AccountInterface;
          return data;
        });
      }));
    return this.accountObs;
  }
  //Tomar una cuenta especifica
  getDataAccount(client: string, id: string) {
    this.accountClientCollection = this.afs.collection('Clients').doc(client).collection('Accounts', ref => ref);
    return this.accountClientCollection.doc(id).valueChanges();
  }
}
