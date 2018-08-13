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
  public isWrongLoginPattern = true;
  public isWrongPasswordPatten = true;
  public loginErrorPattern = false;
  public passwordErrorPattern = false;

  public wrongLogin = false;
  public loginPlaceholder = 'login@example.com';
  public passwdPlaceholder = '●●●●●';

  constructor(public router: Router,
              private authenticationService: AuthenticationService) {
  }
  ngOnInit() {
  }
  login() {
    const emailPattern = new RegExp(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/);
    this.isWrongLoginPattern = emailPattern.test(this.loginText);
    const passwordPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/);
    this.isWrongPasswordPatten = passwordPattern.test(this.passwdText);
    if (!this.isWrongLoginPattern && !this.isWrongLoginPattern) {
      this.loginErrorPattern = true;
      this.passwordErrorPattern = true;
      return 0;
    }
    if (!this.isWrongPasswordPatten && this.isWrongLoginPattern) {
      this.loginErrorPattern = false;
      this.passwordErrorPattern = true;
      return 0;
    }
    if (!this.isWrongLoginPattern && this.isWrongPasswordPatten) {
      this.passwordErrorPattern = false;
      this.loginErrorPattern = true;
      return 0;
    }
    if (this.isWrongLoginPattern && this.isWrongPasswordPatten) {
      this.loginErrorPattern = false;
      this.passwordErrorPattern = false;
    }
    this.authenticationService.loginToProject(this.loginText, this.passwdText).then( (success: any) => {
      localStorage.setItem('token', success.access_token)
      this.ifError = false;
      this.router.navigateByUrl('/dashboard');
      alert(success.message);
    }, error => {
      this.errorMessage = error.error.message;
      this.ifError = true;
    });
  }


}
