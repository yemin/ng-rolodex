import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user = {
    id: 0,
    username: ''
  }

  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() { 
    let userString = window.localStorage.getItem('user');
    try{
      if(userString) { 
        this.user = JSON.parse(userString); 
      }
      else { console.log('user was not found');}

      this._isLoggedInSubject.next(!!userString);
    }
    catch(err){
      console.log('coud not parse user');
      //redirect to login page
      this._isLoggedInSubject.next(false);
    }
  }

  getSession() {
    return this.user;
  }

  setSession({ id, username }) {
    // save to memory
    this.user.id = id;
    this.user.username = username;
    // save to localStorage
    let userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);

    this._isLoggedInSubject.next(true);
  }

  clearSession() {
    this.user.id = 0;
    this.user.username = '';
    window.localStorage.removeItem('user');

    this._isLoggedInSubject.next(false);
  }

  isLoggedInAsAObservable() {
    return this._isLoggedInSubject.asObservable();
  }
}
