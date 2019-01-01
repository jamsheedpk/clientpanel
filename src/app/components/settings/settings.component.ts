import { Component, OnInit } from '@angular/core';
import {  FlashMessagesService } from 'angular2-flash-messages';
import {  Router } from '@angular/router';
import {  SettingsService } from '../../services/settings.service';
import {  Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    public flashMessagesService: FlashMessagesService,
    public settingsservice:  SettingsService,
    public router:  Router,
  ) { }

  ngOnInit() {
    this.settings = this.settingsservice.getSettings();
  }
  onSubmit() {
    this.settingsservice.changeSettings(this.settings);
    this.flashMessagesService.show('Setting saved', {
       cssClass: 'alert-success', timeout: 4000
     });
    this.router.navigate(['/settings']);
  }

}
