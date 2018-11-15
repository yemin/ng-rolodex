import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:boolean = false;
  errormessage:string = '';
  loginFormData = {
    username: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.loginFormData)
    .then(() => {
      console.log('User logged in');
    })
    .then(()=> {
      let url = ['/'];
      if(this.auth.redirectUrl)
      {
        url= [this.auth.redirectUrl];
        this.auth.redirectUrl = '';
      }
      this.router.navigate(url);
    })
    .catch((err) => {
      console.log('error:', err);
      this.error = true;
      this.errormessage = err;
    });
  }

}
