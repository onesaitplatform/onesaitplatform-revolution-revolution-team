import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs-compat/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(protected http: HttpClient) {}

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
        console.log('Correct login');
      }, err => {
        environment.token = null;
        console.log(err);
      }
    );
  }

}
