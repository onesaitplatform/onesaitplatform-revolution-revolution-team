import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs-compat/add/operator/catch';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  env = environment;
  showOK : boolean = false;
  showKO : boolean = false;

  constructor(protected http: HttpClient,private router:Router) {}

  async getToken(username: string, psw: string) {
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
    body.set('password', psw);
    let body_txt = body.toString();

    await this.http.post(
      environment.loginUrl , body_txt , httpOptions
    ).subscribe(
      res => {
        environment.token =  res['access_token'];
        environment.userName =  res['name'];
        sessionStorage.setItem("token",environment.token);
        sessionStorage.setItem("userName",environment.userName);
        sessionStorage.setItem("pg","0");

        this.showOK = true;
        setTimeout(() => { this.router.navigate(['/core']);this.showOK = false;},2000);
        console.log('Correct login');
      }, err => {
        environment.token = null;
        console.log(err);
        this.showKO = true;
        setTimeout(() => {   this.showKO = false; },10000);

      }
    );
  }

}
