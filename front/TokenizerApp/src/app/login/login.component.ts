import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  username: string;
  psw: string;
  submitLogin:boolean = false;

  constructor(private router:Router ) { }

  ngOnInit() {
  }

  login(){
    this.submitLogin = true;
    if (this.username && this.psw)
    this.router.navigate(['/core']);
  }

  skipGuess(){
    
  }

}
