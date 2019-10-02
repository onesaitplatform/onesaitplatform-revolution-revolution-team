import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs-compat/add/operator/catch';
import {Observable} from 'rxjs';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  env = environment;
  showOK : boolean = false;
  constructor(protected http: HttpClient,private router:Router) {}

  async getToken(username: string, psw: string) {
    // tslint:disable-next-line:prefer-const
    var loginUrl = '/api/oauth-server/oauth/token';
    // var loginUrl = 'https://lab.onesaitplatform.com/oauth-server/oauth/token';
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
        environment.userName =  res['name'];
        sessionStorage.setItem("token",environment.token);
        sessionStorage.setItem("userName",environment.userName);
        this.showOK = true;
        setTimeout(() => { this.router.navigate(['/core']);this.showOK = false;},2000);
        console.log('Correct login');

      }, err => {
        environment.token = null;
        console.log(err);
      }
    );
  }

}
