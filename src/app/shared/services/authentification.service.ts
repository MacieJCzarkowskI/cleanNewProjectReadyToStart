import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  body = {};
  url = '/login';
  constructor(private http: HttpClient,
              private router: Router) {
  }
  loginToProject(login, password) {
    this.body = {
      'login': login,
      'password': password
    }
    return this.http.post(this.url, this.body).toPromise();
  }
  logout() {
    this.router.navigateByUrl('/login');
  }
}
