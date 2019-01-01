import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  RouterModule, Routes  } from '@angular/router';
import {  AngularFireModule } from 'angularfire2';
import {  AngularFireAuthModule } from 'angularfire2/auth';
import {  AngularFireDatabaseModule,  AngularFireDatabase } from 'angularfire2/database';
import {  environment } from '../environments/environment';
import {  FormsModule } from '@angular/forms';
import {  FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//  Service
import { ClientService} from './services/client.service';
import {  Settings} from './models/Settings';
import { AuthService  } from './services/auth.service';
import {SettingsService} from './services/settings.service';

//Gurad
import {  AuthGuard} from './guards/auth.guard';
import {  RegisterGuard } from './guards/register.guard';


const appRoutes:  Routes =  [
  {path:  '', component:  DashboardComponent, canActivate:  [AuthGuard]},
  {path:  'client', component:  ClientsComponent, canActivate:  [AuthGuard]},
  {path:  'clients/:id', component:  ClientDetailsComponent, canActivate:  [AuthGuard]},
  {path:  'add-client', component:  AddClientComponent, canActivate:  [AuthGuard]},
  {path:  'edit-client/:id', component:  EditClientComponent, canActivate:  [AuthGuard]},
  {path:  'nave', component:  NavbarComponent},
  {path:  'sidebar', component: SidebarComponent},
  {path:  'login', component:  LoginComponent},
  {path:  'register', component:  RegisterComponent,  canActivate:  [RegisterGuard]},
  {path:  'settings', component:  SettingsComponent,  canActivate:  [AuthGuard]},
  {path:  '**', component:  PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase,  AngularFireDatabaseModule,  ClientService,  AuthService, SettingsService,  AuthGuard, RegisterGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
