import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RegisterPayload} from './register-payload';
import {Observable} from 'rxjs';
import {LoginPayload} from './login-payload';
import {JwtAuthResponse} from './jwt auth response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {

  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + '/api/auth/signup', registerPayload);
  }

  isAuthenticated(): boolean {
  return (this.localStorageService.retrieve('username') != null);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + '/api/auth/login', loginPayload).pipe(map(data => {
      this.localStorageService.store('username', data.username);
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      return true;


    }));


  }


  logout() {
    this.localStorageService.clear('username');
    this.localStorageService.clear('authenticationToken');
  }
}
