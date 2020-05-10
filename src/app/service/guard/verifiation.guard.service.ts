import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.auth.canActivateVerification()) {
      return true;
    } else {
      this.router.navigate(['/get-started']);
      return false;
    }
  }
}
