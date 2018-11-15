import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    private session: SessionService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.session.isLoggedInAsAObservable()
      .subscribe((loggedIn) => {
        if (loggedIn) { return resolve(true); }

        // Store the attempted URL for redirecting
        this.auth.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return resolve(false);
      });
    });
  }
}
