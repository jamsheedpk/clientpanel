import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {  AngularFireAuth} from 'angularfire2/auth';
import {  SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private settingService: SettingsService,
  ) {

  }
  canActivate(): boolean {
      if (this.settingService.getSettings().allowregistration) {
       /* this.router.navigate(['/login']);*/
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}





