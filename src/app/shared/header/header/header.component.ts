import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: object;

  private _isLoggedIn = false;
  private _isLoggedInAsObservable;

  constructor(
    private router: Router,
    private auth: AuthService,
    private session: SessionService
    ) { 
      this.user = this.session.getSession();
    }

  ngOnInit() {
    this._isLoggedInAsObservable = this.session.isLoggedInAsAObservable();
    this._isLoggedInAsObservable.subscribe(
      (loggedIn: boolean) => {
        this._isLoggedIn = loggedIn;
      },
      (error) => { console.log(error)}
    )
  }

  ngOnDestroy(){
    this._isLoggedInAsObservable.unsubscribe();
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  login() {
    return this.router.navigate(['/login']);
  }

  logout() {
    return this.auth.logout()
    .then(()=> {
      return this.router.navigate(['/']);
    });
  }
}
