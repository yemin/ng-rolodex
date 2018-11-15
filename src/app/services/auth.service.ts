import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string = '';
  
  constructor(
    private backend: BackendService, 
    private session: SessionService
    ) { }

  // register(userData){
  //   return this.backend.register(userData)
  //   .then((response)=>{
  //     this.session.setSession(response);
  //   });
  // }
  login(userData){
    return this.backend.login(userData)
    .then((response)=>{
      this.session.setSession(response);
    });
  }
  logout(){
    return this.backend.logout()
    .then(()=>{
      this.session.clearSession();
    });
  }
}
