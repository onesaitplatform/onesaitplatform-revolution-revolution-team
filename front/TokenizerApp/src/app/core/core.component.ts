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
  fileToUpload: File = null;
  pressBtn: boolean;
  
  sessionuser = sessionStorage.getItem("userName");
  constructor(private http: HttpClient, private router: Router, public fileManagerService: FileManagerService ) { }

  // fileProgress(fileInput: any) {
  //     this.fileToUpload: File = null; = <File>fileInput.target.files[0];
  // }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  onSubmit() {
      this.pressBtn = true;
      this.fileManagerService.postFile(this.fileToUpload);
    
      

      // TODO loading gif
      // setTimeout(() => {
      //   if ( environment.fileToken != null) {
      //     // TODO add correct upload message
      //     alert('correct');
      //     this.router.navigate(['/option']);
      //   } else {
      //     // TODO add fail message
      //     alert('Login isn\'t correct');
      //   }
      // }, 60000);
      // // TODO Quit loading gif
  }

  nextToList() {
    this.router.navigate(['/option']);
  }

  ngOnInit() {
  }

  uploadFile() {

  }
}





