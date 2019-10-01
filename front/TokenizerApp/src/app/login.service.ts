import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import {tap} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/catch';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  env = environment;
  private data2: Object;
  private calle: Observable<Object>;
  constructor(protected http: HttpClient) {}

  getToken() {
    // tslint:disable-next-line:prefer-const
    var loginUrl = '/api/oauth-server/oauth/token';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic b25lc2FpdHBsYXRmb3JtOm9uZXNhaXRwbGF0Zm9ybQ==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', 'ppozo');
    body.set('password', 'Nintendo1984#');
    let test = body.toString();

    this.http.post(
      loginUrl , test , httpOptions
    ).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

}
