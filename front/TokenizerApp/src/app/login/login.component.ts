import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  env = environment;
  username: string;
  psw: string;
  submitLogin = false;

  constructor(private router: Router , private http: HttpClient ) { }

  ngOnInit() {
  }

  login() {
    this.submitLogin = true;
    if (this.username && this.psw) {
      if (this.doLogin()) {
        this.router.navigate(['/core']);
      } else {
        alert('Login isn\'t correct');
      }
    }
  }
  private doLogin() {
    this.env.token = '';
    this.env.userName = this.username;
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', this.username);
    formData.append('password', this.psw);

    const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': 'Basic b25lc2FpdHBsYXRmb3JtOm9uZXNhaXRwbGF0Zm9ybQ==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post('https://www.onesaitplatform.online/oauth-server/oauth/token', formData, httpOptions).subscribe(
      ( res: Response) => {
      this.env.token = res.headers.get('access_token');
     }
    );
    return false;
  }

  skipGuess() {
    this.router.navigate(['/core']);
  }

}
