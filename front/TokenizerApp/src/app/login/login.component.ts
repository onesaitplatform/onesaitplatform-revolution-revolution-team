import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
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
    environment.token = null;
    this.submitLogin = true;
    if (this.username && this.psw) {
    this.loginService.getToken(this.username, this.psw);
    // TODO loading gif
    setTimeout(() => {
      if (environment.token != null) {
        environment.userName = this.username;
        // TODO add welcome message
        this.router.navigate(['/core']);
      } else {
        // TODO add fail message
        alert('Login isn\'t correct');
      }
    }, 6000);
    // TODO Quit loading gif
}
  }
  skipGuess() {
    this.router.navigate(['/core']);
  }

}
