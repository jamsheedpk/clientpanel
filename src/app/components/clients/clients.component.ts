import { Component, OnInit } from '@angular/core';
import {  ClientService} from '../../services/client.service';
import {  SClient } from '../../models/SClient';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:  any[];
  totalOwed:  number;
  constructor(private clientService: ClientService) {

  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients =>  {
      /* console.log(clients);*/
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed()  {
    let total = 0;
    for (let i =  0;  i <  this.clients.length; i++  )  {
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed  = total;
  }
}
