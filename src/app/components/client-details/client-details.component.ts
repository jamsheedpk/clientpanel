import { Component, OnInit } from '@angular/core';
import {  ClientService } from '../../services/client.service';
import {  FlashMessagesService  } from 'angular2-flash-messages';
import {  Router, ActivatedRoute, Params} from '@angular/router';
import {  SClient} from '../../models/SClient';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: SClient;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  constructor(private clientService:  ClientService,
              private router: Router,
              private route:  ActivatedRoute,
              private flashMessagesService:  FlashMessagesService
  ) { }

  ngOnInit() {
    //Get id from url
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client  => {
      if  ( client.balance > 0  ) {
        this.hasBalance = true;
      }
      this.client = client;
    });

  }
  updateBalance(  id: string ) {
    this.clientService.updateClient(this.id,  this.client);
    this.flashMessagesService.show(' New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
    alert('Update Balance');
    this.router.navigate(['/clients/' + this.id]);
  }
  onDeleteClick(  id: string) {
    if  (confirm('Are you sure to delete ?'))  {
      this.clientService.deleteClient(this.id);
      alert('Client removed ');
      this.router.navigate(['/']);
    }}

}
