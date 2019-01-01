import { Component, OnInit } from '@angular/core';
import {  SClient} from '../../models/SClient';
import {  FlashMessagesService } from 'angular2-flash-messages';
import {  Router } from '@angular/router';
import {  ClientService} from '../../services/client.service';
import {  SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  disableBalanceAddOn:  boolean = true;

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
    private clientService:  ClientService,
   private settingService:  SettingsService) { }

  ngOnInit() {
    this.disableBalanceAddOn = this.settingService.getSettings().disableBalanceAddOn;
  }

  onSubmit({value,  valid }: {value:  SClient, valid:  boolean  }) {
    if  (this.disableBalanceAddOn)  {
      value.balance = 0;
    }
    if  (!valid)  {
      this.flashMessagesService.show('', {
        cssClass: 'alert-danger', timeout: 4000
      });
      this.router.navigate(['add-client']);
    } else {
    // Add New Client
      this.clientService.addNewClient(value);
    this.flashMessagesService.show(' New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
