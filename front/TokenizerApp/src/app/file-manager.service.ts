import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  env = environment;
  public file: File;
  fileUpload:boolean=false;
  namefileUploaded;

  constructor(protected http: HttpClient) { }

  // async uploadFile(file: File) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       // tslint:disable-next-line:max-line-length
  //       'Authorization': 'Bearer ' + environment.token,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     })
  //   };
  //   const body = new FormData();
  //   body.append('repository', '');
  //   body.append('file', file);
  //   await this.http.post(
  //     environment.uploadUrl , body , httpOptions
  //   ).subscribe(
  //     res => {
  //       environment.fileToken =  res.toString();
  //       console.log('Correct uplad file');

  //     }, err => {
  //       environment.token = null;
  //       console.log(err);
  //     }
  //   );
  // }

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
        console.log('Correct uplad file');

      }, err => {
        environment.token = null;
       
        if(err.statusText ==  "Created"){
          setTimeout(() => {this.fileUpload = true;},2000)
          
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

  async getJSONFile(fileToken: String): Promise<Observable<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token
      })
    };
    return this.http.get(
      environment.uploadUrl + '/' + fileToken , httpOptions
    ).map((res: any) => res.json());
  }
}
