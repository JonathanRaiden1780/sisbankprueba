import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { UserInterface } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  registerCollection: AngularFirestoreCollection<UserInterface>;
  registerClientCollection: AngularFirestoreCollection<UserInterface>;
  registerDoc: AngularFirestoreDocument<UserInterface>;
  register: Observable<UserInterface[]>;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    
  ) {
    this.user = afAuth.authState;
    this.registerCollection = this.afs.collection('Register', ref => ref); 
    this.registerClientCollection = this.afs.collection('Clients', ref => ref); 
  }
   //Registra Usuario en FirebaseAuth (correo/contraseña)
   registerUser(email:string, pass:string){
     return new Promise((resolve, reject) => {
       this.afAuth.auth.createUserWithEmailAndPassword(email,pass).then(
         userData => resolve(userData), 
         err => reject(err));
     })
   }
   //Registra usuario en Firestore
   addUser(registerData: UserInterface){
     this.registerCollection.doc(registerData.id).set(registerData);
     if(registerData.employee == 'false' ){
      this.registerClientCollection.doc(registerData.ident).set(registerData);
     }
   }
   //Elimina Usuario de Firetore
   deleteUser(registerData: UserInterface){
     this.registerDoc = this.afs.doc('Register/' + registerData.id);
     this.registerDoc.delete();
     this.afAuth.auth.signOut;     
   }
   //Actualizar Usuario
   updateUser(registerData: UserInterface){
     this.registerDoc = this.afs.doc('Register/' + registerData.id);
     this.registerDoc.update(registerData);
   }
   //Metodo Login
   login(email:string, pass:string){
     return new Promise((resolve, reject) => {
       this.afAuth.auth.signInWithEmailAndPassword(email,pass).then(
         userData => resolve(userData),
         err => reject(err));
    });
  }
  //Metodo Logout
  logout() {
    return this.afAuth.auth.signOut();
  }
  //Verificar estado
  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  //Validar información de usuario
  getUserData(id: string){
    return this.registerCollection.doc(id).valueChanges();
  }
  getUserIdent(id:string){
    return this.registerClientCollection.doc(id).valueChanges();
  }
}