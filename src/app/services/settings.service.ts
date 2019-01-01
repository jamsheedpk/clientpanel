import { Injectable } from '@angular/core';
import {  Settings} from '../models/Settings';

@Injectable()
export class SettingsService {
  settings: Settings  = {
    allowregistration:  true,
    disableBalanceEditOn: false,
    disableBalanceAddOn:  false,
  }
  constructor() {
    if  (localStorage.getItem('settings') != null)  {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings() {
    return this.settings;
  }

  changeSettings(settings: Settings)  {
  localStorage.setItem('settings',  JSON.stringify(settings));
  }
}
