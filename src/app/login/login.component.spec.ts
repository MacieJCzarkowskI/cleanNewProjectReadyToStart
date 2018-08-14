import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient } from '@angular/common/http';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('check few wariants of working login', () => {
    let isLoginOk = true;
    const acceptedLogin = [
      {
        'login': 'maciek@tlen.pl',
      },
      {
        'login': 'MACIEK@tLeN.com.pl',
      },
      {
        'login': 'maciej94.czarkowski@gmail.com',
      },
      {
        'login': 'maciej.czarkowski94@gmail.com',
      },
      {
        'login': 'test@test.pl',
      }
    ];
    acceptedLogin.forEach((value => {
      if ( !component.emailPattern.test(value.login) ) {
        return isLoginOk = false;
      }
    }));
    expect(isLoginOk).toBe(true);
  });
  it('check few wariants of wrong login', () => {
    let isLoginOk = false;
    const acceptedLogin = [
      {
        'login': 'maciek.pl',
      },
      {
        'login': 'MACIEK@.com.pl',
      },
      {
        'login': '@gmail.com',
      },
      {
        'login': 'maciek',
      },
      {
        'login': '@94',
      }
    ];
    acceptedLogin.forEach((value => {
      if ( component.emailPattern.test(value.login) ) {
        return isLoginOk = true;
      }
    }));
    expect(isLoginOk).toBe(false);
  });
  it('check few wariants of wrong password', () => {
    let isPasswordOK = false;
    const acceptedPassword = [
      {
        'password': 'maciek.pl',
      },
      {
        'password': 'maciek1',
      },
      {
        'password': 'macko199994',
      },
      {
        'password': 'maciek@333dd',
      },
    ];
    acceptedPassword.forEach((value => {
      if ( component.passwordPattern.test(value.password) ) {
        return isPasswordOK = true;
      }
    }));
    expect(isPasswordOK).toBe(false);
  });
  it('check few wariants of working password', () => {
    let isPasswordOK = true;
    const acceptedPassword = [
      {
        'password': 'Password1',
      },
      {
        'password': 'Maciek123',
      },
      {
        'password': 'olAmAKot20',
      },
    ];
    acceptedPassword.forEach((value => {
      if ( !component.passwordPattern.test(value.password) ) {
        return isPasswordOK = false;
      }
    }));
    expect(isPasswordOK).toBe(true);
  });
});
