import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs-compat/add/operator/catch';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  env = environment;
  constructor(protected http: HttpClient) {}

  async getToken(username: string, psw: string) {
    // tslint:disable-next-line:prefer-const
    var loginUrl = '/api/oauth-server/oauth/token';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': environment.autorization,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', 'Nintendo1984#');
    let test = body.toString();

    await this.http.post(
      loginUrl , test , httpOptions
    ).subscribe(
      res => {
        environment.token =  res['access_token'];
        console.log('Correct login');

      }, err => {
        environment.token = null;
        console.log(err);
      }
    );
  }

}
