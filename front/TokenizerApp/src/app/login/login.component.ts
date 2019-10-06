import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs-compat/add/operator/map';
import { LoginService } from '../login.service';
import { FileManagerService } from '../file-manager.service';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbAlertConfig]
})

@Injectable()
export class LoginComponent implements OnInit {
  env = environment;
  username: string;
  psw: string;
  submitLogin = false;

  constructor(private router: Router ,public loginService: LoginService,public fileManagerService: FileManagerService,alertConfig: NgbAlertConfig ) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
   }

  ngOnInit() {
  }

  login() {

    environment.token = null;
    this.submitLogin = true;
    if (this.username && this.psw) {
    this.loginService.getToken(this.username, this.psw);
    setTimeout(() => {
      this.fileManagerService.getFile(environment.dataFileID);
    }, 6000);

    environment.dataFile = this.fileManagerService.file;
}
  }
  skipGuess() {

    this.loginService.getToken("anonymous", "Anonymous2019!");
  }



}
