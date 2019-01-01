import { Injectable } from '@angular/core';
import {  AngularFireDatabase,  AngularFireList,  AngularFireObject} from 'angularfire2/database';
import {  Observable  } from 'rxjs/Observable';
import {  SClient } from '../models/SClient';

@Injectable()
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients:  Observable<any[]>;
  client: Observable<any>;

  constructor(private db: AngularFireDatabase ) {
    this.clientsRef = this.db.list('clients');
    // Use snapshotChanges().map() to store the key
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // Use valueChange()  get value
   /* this.clients = this.clientsRef.valueChanges();*/
  }
  getClients()  {
    return this.clients;
  }
  addNewClient(client:  SClient)  {
  this.clientsRef.push(client);
  }
  /*editNewClient(client:  SClient)  {
    this.clientsRef.push(client);
  }*/

  getClient(id: string)  {
  this.client = this.db.object('/clients/' + id).valueChanges();
  return this.client;
  }
  updateClient(id:  string, client:  SClient) {
    return this.clientsRef.update(id, client);
  }
  deleteClient(id: string)  {
    return  this.clientsRef.remove(id);
  }
}
