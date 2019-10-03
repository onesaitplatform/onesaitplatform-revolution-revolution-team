import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import {FileManagerService} from '../file-manager.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})


export class CoreComponent implements OnInit {
  fileToUpload:  File;
  pressBtn: boolean;
  constructor(private http: HttpClient, private router: Router, protected fileManagerService: FileManagerService ) { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSubmit() {
      this.pressBtn = true;
      const formData = new FormData();
      environment.fileToken = null;
      this.fileManagerService.postFile(this.fileToUpload);
      // TODO loading gif
      setTimeout(() => {
        if ( environment.fileToken != null) {
          // TODO add correct upload message
          alert('correct');
          this.router.navigate(['/option']);
        } else {
          // TODO quit... fail message
          environment.fileToken = '5d94a4a918b39b000cf1bfd6';
          this.router.navigate(['/option']);
          alert('Login isn\'t correct');
        }
      }, 60000);
      // TODO Quit loading gif
  }

  nextToList() {
    this.router.navigate(['/option']);
  }

  ngOnInit() {
  }

  uploadFile() {

  }
}