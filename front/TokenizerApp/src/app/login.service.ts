import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  env = environment;
  private data2: Object;
  constructor(protected http: HttpClient) {}

  getToken() {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', 'ppozo');
    formData.append('password', 'Nintendo1984#');

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic b25lc2FpdHBsYXRmb3JtOm9uZXNhaXRwbGF0Zm9ybQ==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    alert('ass');

    this.http.post('https://lab.onesaitplatform.com/oauth-server/oauth/token', formData, httpOptions).pipe(
      tap( // I want to obtain the token
        data => this.data2 = data,
        error => alert('error)'
      )
    ));

    //Response my be
    /*{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmluY2lwYWwiOiJwcG96byIsImNsaWVudElkIjoib25lc2FpdHBsYXRmb3JtIiwidXNlcl9uYW1lIjoicHBvem8iLCJzY29wZSI6WyJvcGVuaWQiLCJhdXRob3JpemF0aW9uX2NvZGUiXSwibmFtZSI6InBwb3pvIiwiZXhwIjoxNTY5OTY4Njg0LCJncmFudFR5cGUiOiJwYXNzd29yZCIsInBhcmFtZXRlcnMiOnsiY2xpZW50SWQiOiIiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJzY29wZSI6IiIsInVzZXJuYW1lIjoicHBvem8ifSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ERVZFTE9QRVIiXSwianRpIjoiY2Y1N2I0OGEtMmY1ZC00OTgwLTljYTMtODM5MmYxMmUwNWNiIiwiY2xpZW50X2lkIjoib25lc2FpdHBsYXRmb3JtIn0.qnklcBiqTfAeythp-jpiWVVVKTDfqIwumJlEjW4FUBI",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmluY2lwYWwiOiJwcG96byIsImNsaWVudElkIjoib25lc2FpdHBsYXRmb3JtIiwidXNlcl9uYW1lIjoicHBvem8iLCJzY29wZSI6WyJvcGVuaWQiLCJhdXRob3JpemF0aW9uX2NvZGUiXSwiYXRpIjoiY2Y1N2I0OGEtMmY1ZC00OTgwLTljYTMtODM5MmYxMmUwNWNiIiwibmFtZSI6InBwb3pvIiwiZXhwIjoxNTcyMTA0NDUwLCJncmFudFR5cGUiOiJwYXNzd29yZCIsInBhcmFtZXRlcnMiOnsiY2xpZW50SWQiOiIiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJzY29wZSI6IiIsInVzZXJuYW1lIjoicHBvem8ifSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ERVZFTE9QRVIiXSwianRpIjoiZGMyOTVhOWMtOWU1MS00ODlhLTg0MTgtNGEyNTI4MTA0MWIwIiwiY2xpZW50X2lkIjoib25lc2FpdHBsYXRmb3JtIn0.OUxGQ-ip91iNJ53EiaCzuf1yW4WhAm_BNCiC4IeLZtk",
    "expires_in": 43199,
    "scope": "openid authorization_code",
    "principal": "ppozo",
    "clientId": "onesaitplatform",
    "name": "ppozo",
    "grantType": "password",
    "parameters": {
        "clientId": "",
        "grant_type": "password",
        "scope": "",
        "username": "ppozo"
    },
    "authorities": [
        "ROLE_DEVELOPER"
    ],
    "jti": "cf57b48a-2f5d-4980-9ca3-8392f12e05cb"
}


     */
    return false;
  }
}
