import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import {UploadFileService} from '../upload-file.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})


export class CoreComponent implements OnInit {
  file:  File;
  pressBtn: boolean;
  constructor(private http: HttpClient, private router: Router, protected uploadService: UploadFileService ) { }

  fileProgress(fileInput: any) {
      this.file = <File>fileInput.target.files[0];
  }

  onSubmit() {
      this.pressBtn = true;
      const formData = new FormData();
      environment.fileToken = null;
     // this.uploadService.uploadFile(this.file);
      debugger;
      this.uploadService.saveFile(this.file);
      // TODO loading gif
      setTimeout(() => {
        if ( environment.fileToken != null) {
          // TODO add correct upload message
          alert('correct');
          this.router.navigate(['/option']);
        } else {
          // TODO add fail message
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





