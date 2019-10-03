import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FileManagerService} from '../file-manager.service';
import {environment} from '../../environments/environment';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  private file: File;
  private filePass: string;
  constructor(private router: Router, protected fileManagerService: FileManagerService) { }

  ngOnInit() {
    this.fileManagerService.getFile(environment.fileToken);
    this.file = this.fileManagerService.file;
    this.filePass = environment.filePass;
  }

  returnTo(){
    this.router.navigate(['/']);
  }

  getTokenOnWindow() {
    // TODO Show token in modal screen
  }

  downloadFile() {
    // TODO Download file
  }
}
