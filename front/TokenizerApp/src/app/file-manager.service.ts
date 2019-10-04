import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  env = environment;
  public file: File;
  fileUpload: boolean;
  namefileUploaded;

  constructor(protected http: HttpClient) {
    this.fileUpload = false;
  }

  postFile(fileToUpload: File) {

    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token
      })
    };

    const endpoint = environment.uploadUrl;
    const formData: FormData = new FormData();
    this.namefileUploaded = fileToUpload.name;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(
      environment.uploadUrl , formData , httpOptions
    ).subscribe(
      res => {
        environment.fileToken =  res.toString();
        console.log('Correct upload file',  res);

      }, err => {
        environment.fileToken = err.error.text;
        console.log('Correct upload file', err);
        if (err.statusText === 'Created') {
          setTimeout(() => {
            this.fileUpload = true;
          }, 2000);
        }
      }
    );
}

  async getFile(fileToken: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token
      })
    };
    await this.http.get(
      environment.uploadUrl + '/' + fileToken , httpOptions
    ).subscribe(
      res => {
        this.file = new File(res['fileName'], res['data']);
        console.log('File obtained');
      }, err => {
        console.log(err);
      }
    );
    return this.file;
  }

  async modifyFile(fileToken: String, fileUpadted: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + environment.token
      })
    };
    const body = new FormData();
    body.append('repository', '');
    body.append('file', fileUpadted);
    await this.http.put(
      environment.uploadUrl + '/' + fileToken , body, httpOptions
    ).subscribe(
      res => {
        this.file = new File(res['fileName'], res['data']);
        console.log('File modified');
      }, err => {
        console.log(err);
      }
    );
  }

  async deleteFile(fileToken: String, fileUpadted: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + environment.token
      })
    };
    await this.http.delete(
      environment.uploadUrl + '/' + fileToken , httpOptions
    ).subscribe(
      res => {
        this.file = new File(res['fileName'], res['data']);
        console.log('File deleted');
      }, err => {
        console.log(err);
      }
    );
  }

}
