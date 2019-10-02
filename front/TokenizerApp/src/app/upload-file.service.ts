import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  env = environment;

  constructor(protected http: HttpClient) { }

  async uploadFile(file: File) {

    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new FormData();
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

  saveFile(file: File, fileKey: String) {
    debugger;
    // We have on this json de users data
    const json_data = require('../assets/data/data.json');
    const writeJsonFile = require('write-json-file');
    const user = json_data[0];
    debugger;
    // change the json data
    json_data[0] = ' [{"name2" : "testy221.csv", "ke22y" : "ke222y"},{"name" : "testy1.csv", "key" : "key"},{"name" : "testy1.csv", "key" : "key"}]';
    // create json
    const json = JSON.stringify(json_data);
    // write to file
    (async () => {
      await writeJsonFile('../assets/data/data.json', json);
    })();
    console.log('File read failed:', json_data);

  }


}
