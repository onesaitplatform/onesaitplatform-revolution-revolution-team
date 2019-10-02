import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  env = environment;
  private file: File;

  constructor(protected http: HttpClient) { }

  async uploadFile(file: File) {

    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let body = new FormData();
    body.append('repository', '');
    body.append('file', file);
    await this.http.post(
      environment.uploadUrl , body , httpOptions
    ).subscribe(
      res => {
        environment.fileToken =  res.toString();
        console.log('Correct login');

      }, err => {
        environment.token = null;
        console.log(err);
      }
    );
  }
}
