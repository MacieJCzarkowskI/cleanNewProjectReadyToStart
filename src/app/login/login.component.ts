import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AuthenticationService} from '../shared/services/authentification.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  public passwdText: string;
  public loginText: string;
  public errorMessage = '';
  public ifError = false;
  public activeLogin = false;
  public emailValid;
  public isSubmitted;

  public wrongLogin = false;
  public loginPlaceholder = 'login@example.com';
  public passwdPlaceholder = '●●●●●';

  constructor(public router: Router,
              private authenticationService: AuthenticationService) {
  }
  ngOnInit() {
  }
  login() {
    this.authenticationService.loginToProject(this.loginText, this.passwdText).then( (success: any) => {
      console.log('success', success);
      localStorage.setItem('token', success.access_token)
      this.ifError = false;
      this.router.navigateByUrl('/dashboard');
      alert(success.message);
    }, error => {
      console.log('error', error);
      this.errorMessage = error.error.message;
      this.ifError = true;
    });
  }


}
