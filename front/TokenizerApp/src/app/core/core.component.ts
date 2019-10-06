import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenifyService } from '../tokenify.service';
import {FileManagerService} from '../file-manager.service';
import {environment} from '../../environments/environment';
import * as $ from 'jquery';

export interface FileElement {
  id: string;
  name: string;
}

const ELEMENT_DATA: FileElement[] = [];
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {
  fileToUpload:  File;
  pressBtn: boolean;
  sessionuser = sessionStorage.getItem('userName');
  dataSource = ELEMENT_DATA;
  constructor(private http: HttpClient, private router: Router, public fileManagerService: FileManagerService,public tokenifyService: TokenifyService ) {
    // debugger;
    // // tslint:disable-next-line:prefer-const

    // $.getJSON( environment.dataFile.toString(), function( data ) {
    //     this.data = data;
    // });
   // console.log( this.data );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileManagerService.fileUpload = false;
    this.fileManagerService.uploadFailed = false;
    this.pressBtn = false;
    this.tokenifyService.fieldOk = false;
  }
  onSubmit() {
      if (this.fileToUpload) this.pressBtn = true;
      const formData = new FormData();
      environment.fileToken = null;
      this.fileManagerService.postFile(this.fileToUpload);
      // TODO loading gif
      // setTimeout(() => {
      //   if ( environment.fileToken != null) {
      //     // TODO add correct upload message
      //     alert('correct');
      //     this.router.navigate(['/option']);
      //   } else {
      //     // TODO quit... fail message
      //     environment.fileToken = '5d94a4a918b39b000cf1bfd6';
      //     this.router.navigate(['/option']);
      //     alert('Login isn\'t correct');
      //   }
      // }, 60000);
      // TODO Quit loading gif
  }

  nextToList() {
    sessionStorage.setItem("pg","1");
    this.router.navigate(['/option']);
  }

  ngOnInit() {
    if (sessionStorage.getItem("pg")!="0") {
      if(sessionStorage.getItem("token")){
        this.router.navigate(['/core']);
        this.fileManagerService.fileUpload = false;
        this.fileManagerService.uploadFailed = false;
      } else this.router.navigate(['core']);
    }
  }

  uploadFile() {
  }

  logout() {
    this.router.navigate(['/']);
  }
}
