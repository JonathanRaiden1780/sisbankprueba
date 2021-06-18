import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AccountComponent } from 'src/app/components/account/account.component';
import { AccountInterface } from 'src/interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  registerCollection: AngularFirestoreCollection<AccountInterface>;
  user: Observable<firebase.User>;
  registerClientCollection: AngularFirestoreCollection<AccountInterface>;
  registerDoc: AngularFirestoreDocument<AccountInterface>;
  register: Observable<AccountInterface[]>;
  constructor(
    private afs: AngularFirestore

  ) {
    this.registerCollection = this.afs.collection('Register', ref => ref); 
   }
  addUser(registerData: AccountInterface){
    this.registerCollection.doc(registerData.id).set(registerData);
  }
  deleteUser(registerData: AccountInterface){
    this.registerDoc = this.afs.doc('Clients/' + registerData.id);
    this.registerDoc.delete();

  }
  //Actualizar Usuario
  updateUser(registerData: AccountInterface){
    this.registerDoc = this.afs.doc('Clients/' + registerData.id);
    this.registerDoc.update(registerData);
  }
}
