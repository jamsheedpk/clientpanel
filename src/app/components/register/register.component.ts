import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:  string;
  password: string;
  constructor(private router: Router,
              private authService:  AuthService,
               private flashMessagesService: FlashMessagesService) { }


  ngOnInit() {
  }
  onSubmit()  {
    this.authService.registerUser(this.email,  this.password)
      .then((res) => {
        this.flashMessagesService.show('New User registered', {
            cssClass: 'alert-success', timeout: 4000
          });
        this.router.navigate(['/']);
      })
      .catch((err)  =>  {
        this.flashMessagesService.show('Invalid email or password', {
          cssClass: 'alert-danger', timeout: 4000
        });
        this.router.navigate( ['/register']);
      });
  }
}
