import { Injectable } from '@angular/core';
import {  AngularFireDatabase,  AngularFireList,  AngularFireObject} from 'angularfire2/database';
import {  Observable  } from 'rxjs/Observable';
import {  SClient } from '../models/SClient';
import {  AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {

  constructor(private afAth:  AngularFireAuth) { }
  loginUser(email: string, password: string) {
    return new Promise((resolve,  reject) =>  {
    this.afAth.auth.signInWithEmailAndPassword(email, password)
      .then(userData  =>  resolve(userData),
        err => reject(err));
    });
  }
  registerUser(email: string, password: string)  {
    return new Promise((resolve,  reject) =>  {
      this.afAth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData  =>  resolve(userData),
          err => reject(err));
    });
  }
  getAuth() {
    return this.afAth.authState.map(auth  =>  auth);
  }
  logout()  {
    return  this.afAth.auth.signOut();
  }
}
