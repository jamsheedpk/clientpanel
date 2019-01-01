import { Component, OnInit } from '@angular/core';
import {  SClient} from '../../models/SClient';
import {  FlashMessagesService } from 'angular2-flash-messages';
import {  Router, ActivatedRoute, Params } from '@angular/router';
import {  ClientService} from '../../services/client.service';
import {  SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  disableBalanceEditOn:  boolean = true;
  hasBalance: boolean = true;
  id: string;
  client:  SClient  = {
    firstName:  '',
    lastName: '',
    email:  '',
    phone:  '',
    balance:  0,
  }
  constructor(
              private flashMessagesService: FlashMessagesService,
              private router: Router,
              private clientService:  ClientService ,
              private route:  ActivatedRoute,
              private settingService:  SettingsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client  => {
      /*if  ( client.balance > 0  ) {
        this.hasBalance = true;
      }*/
      this.client = client;
    });
    this.disableBalanceEditOn = this.settingService.getSettings().disableBalanceEditOn;
  }

  onSubmit({value,  valid }: {value:  SClient, valid:  boolean  }) {
    if  (this.disableBalanceEditOn)  {
      value.balance = 0;
    }
    if  (!valid)  {
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass: 'alert-danger', timeout: 4000
      });
      this.router.navigate(['edit-client/'  + this.id]);
    } else {
      // Add New Client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show(' New client added', {
         ssClass: 'alert-success', timeout: 4000
        });
      alert('client updated')
      this.router.navigate(['/clients/' + this.id]);
    }
  }
}
