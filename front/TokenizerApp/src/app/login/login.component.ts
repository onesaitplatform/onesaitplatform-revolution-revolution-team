import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
import { LoginService } from '../login.service';
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

  constructor(private router: Router , protected loginService: LoginService ) { }

  ngOnInit() {
  }

  login() {
    this.submitLogin = true;
    if (this.username && this.psw) {
      if (this.loginService.getToken() != null) {
        alert(this.env.token);
        this.router.navigate(['/core']);
      } else {
        alert('Login isn\'t correct');
      }
    }
  }
  skipGuess() {
    this.router.navigate(['/core']);
  }

}
