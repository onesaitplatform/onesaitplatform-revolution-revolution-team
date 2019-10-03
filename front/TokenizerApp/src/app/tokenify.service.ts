import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PeriodicElement } from './option/option.component';

@Injectable({
  providedIn: 'root'
})
export class TokenifyService {
  private resultado: PeriodicElement[];
  private pass: string;

  constructor(protected http: HttpClient) { }
  async putTokenifyLinks(idFile: string, flags: string[], method: string) {
    // TODO quit with real values
    flags = ['0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    idFile = '5d94a4a918b39b000cf1bfd6';
    method = 'FPE';
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new FormData();
    body.append('params',
      '"USER_TOKEN": "Bearer "' + environment.token + ',"file_id": "' + idFile + '",' +
      '"user": "anonymous","method": "' + method + '","flags": ' + flags);
    await this.http.post(
      environment.uploadUrl, body, httpOptions
    ).subscribe(
      res => {
        this.pass = res['generatedPass'];
        console.log('Correct: links obtained successful ');

      }, err => {
        this.resultado = null;
        console.log(err);
      }
    );
  }

  async listTokenifyFields(idFile: String) {
    // TODO quit with real values
    idFile = '5d94a4a918b39b000cf1bfd6';
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        "Accept":"*/*"
      })
    };
    // const body = new FormData();
    // body.append('params',
    //   '"USER_TOKEN": "Bearer "' + environment.token + ',' +
    //   '"user": "anonymous","separator": ",","file_id": ' + idFile );

    const bodys = {
      params: {
        user: "anonymous",
        USER_TOKEN: "Bearer " + environment.token,
        file_id: idFile
      }
    }

    let bodyp = {};
    let body = {};
    bodyp["user"] = "anonymous";
    bodyp["USER_TOKEN"] = "Bearer " + environment.token;
    bodyp["file_id"] = idFile;
    body["params"] = bodyp;

    await this.http.post(
      environment.fieldUrl, JSON.stringify(bodys), httpOptions
    ).subscribe(
      res => {
        this.resultado = this.getPeriodicElements(res);
        console.log('Correct: links obtained successful ');

      }, err => {
        this.resultado = null;
        console.log(err);
      }
    );

    return this.resultado;
  }

  private getPeriodicElements(res: Object) {
    //TODO this parse
    return [];
  }
}
