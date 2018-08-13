import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/login') && request.method === 'POST') {
        if (request.body.login === 'test@test.pl' && request.body.password === 'Password1') {
          return of(new HttpResponse({status: 200, body: {'message': 'login successful', 'access_token': 'bearer 0010011'}}));
        }
        else {
          return throwError({status: 401, error: { message: 'invalid email or password' } });
        }

    }

    return next.handle(request);
  }

}
