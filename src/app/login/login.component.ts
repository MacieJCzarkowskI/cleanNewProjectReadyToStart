import { Component, OnInit } from '@angular/core';
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
  public loginPlaceholder = 'login@example.com';
  public passwdPlaceholder = '●●●●●';
  public emailPattern = new RegExp(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/);
  public passwordPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/);
  constructor(public router: Router,
              public authenticationService: AuthenticationService) {
  }
  ngOnInit() {}
  login() {
    this.checkPatterns();
    if (!this.loginErrorPattern && !this.passwordErrorPattern) {
      this.authenticationService.loginToProject(this.loginText, this.passwdText).then((success: any) => {
        localStorage.setItem('token', success.access_token);
        this.ifError = false;
        this.router.navigateByUrl('/dashboard');
        alert(success.message);
      }, error => {
        this.errorMessage = error.error.message;
        this.ifError = true;
      });
    }
  }
  checkPatterns() {
    this.isWrongLoginPattern = this.emailPattern.test(this.loginText);
    this.isWrongPasswordPatten = this.passwordPattern.test(this.passwdText);
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
  }
}
