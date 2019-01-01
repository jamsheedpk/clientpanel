import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {  SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private router: Router,
              private authService:  AuthService,
              private settingService: SettingsService,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>  {
      if  (auth)  {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;

      }else {
        this.isLoggedIn = false;
      }

    });
    this.showRegister = this.settingService.getSettings().allowregistration;
  }
  onLogout()  {

   /* this.flashMessagesService.show('Log out completely', {
            cssClass: 'alert-success', timeout: 4000
          });*/
    this.router.navigate( ['/login'], (res) => {
      this.authService.logout();
    });
  }
}
