import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenifyService {
  private resultado;
  private pass: string;
  public fields: string[];
  public value;
  favoriteTk: string;
  se: string;
  op: string;
  fieldOk:boolean;

  constructor(protected http: HttpClient) { }

  async putTokenifyLinks(idFile: string, flags: bigint[], method: string) {
    // TODO quit with real values
    //flags = ['0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    //idFile = '5d94a4a918b39b000cf1bfd6';
    switch (this.favoriteTk) {
      case 'Symetric encryption':
        method = 'FPE';
        break
      case 'Asymentric encryption':
        method = 'AES';
        break
      case 'Obfuscation':
        method = 'MAP';
        break
    }
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        'Accept': '*/*'
      })
    };
    // const body = new FormData();
    // body.append('params',
    //   '"USER_TOKEN": "Bearer "' + environment.token + ',"file_id": "' + idFile + '",' +
    //   '"user": "anonymous","method": "' + method + '","flags": ' + flags);

    let bodyp = {};
    let body = {};
    bodyp['user'] = environment.userName;
    bodyp['USER_TOKEN'] = 'Bearer ' + environment.token;
    bodyp['file_id'] = idFile;
    bodyp['method'] = method;
    bodyp['flags'] = this.value;
    body['params'] = bodyp;

    await this.http.post(
      environment.tokenfyUrl, body, httpOptions
    ).subscribe(
      res => {
        let resp = res['body']['results']['msg'][0]['data'];
        this.getLinkOut(resp);
        console.log('Correct: links obtained successful ');

      }, err => {
        this.resultado = null;
        console.log(err);
      }
    );
  }

  async listTokenifyFields(idFile: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        'Accept': '*/*'
      })
    };

    const bodys = {
      params: {
        user: environment.userName,
        USER_TOKEN: 'Bearer ' + environment.token,
        file_id: idFile
      }
    }

    let bodyp = {};
    let body = {};
    bodyp['user'] = environment.userName;
    bodyp['USER_TOKEN'] = 'Bearer ' + environment.token;
    bodyp['file_id'] = idFile;
    bodyp['separator'] = ",";
    body['params'] = bodyp;



    await this.http.post(
      environment.fieldUrl, body, httpOptions
    ).subscribe(
      res => {
        let resp = res['body']['results']['msg'][0]['data'];
        this.getFields(resp);
        this.fieldOk = true;
      }, err => {
        console.log(err);
      }
    );

    return this.resultado;
  }

  private getFields(resp) {

    let jsonF = JSON.stringify(resp);
    jsonF = jsonF.substring(jsonF.indexOf("'fields': "), jsonF.indexOf('}'));
    jsonF = jsonF.substring(jsonF.indexOf("["));
    jsonF = jsonF.replace(/'/g, '');
    jsonF = jsonF.replace(/ /g, '');
    jsonF = jsonF.replace("\\n", "");
    jsonF = jsonF.replace("[", "").replace("]", "")

    this.fields = jsonF.split(',');
    console.log("body", this.fields);

  }

  // private getLinkSec(resp) {
  //   // res = res.replace('\\n(True, \'{\\message\\:"Disconnected"}\')\n', ' ');
  //   // res = res.match('\'fields\':(.*)');
  //   // this.fields = res[1].split(',');
  //   // console.log("fields",this.fields)

  //   let jsonF = JSON.stringify(resp);
  //   jsonF = jsonF.substring(jsonF.indexOf("'secret': "), jsonF.indexOf('}'));
  //   jsonF = jsonF.substring(jsonF.indexOf("["));
  //   jsonF = jsonF.replace(/'/g, '');
  //   jsonF = jsonF.replace(/ /g, '');
  //   jsonF = jsonF.replace("\\n", "");
  //   jsonF = jsonF.replace("[", "").replace("]", "")

  //   this.fields = jsonF.split(',');
  //   console.log("body", this.fields)

  // }

  private getLinkOut(resp) {


    let jsonF = JSON.stringify(resp);
    this.se = jsonF.substring(
      jsonF.lastIndexOf("'secret': '") + 11,
      jsonF.lastIndexOf("', 'output'")
    );

    this.op = jsonF.substring(
      jsonF.lastIndexOf("'output': '") + 11,
      jsonF.lastIndexOf("'}")
    );

    console.log("jsonF", jsonF)
    console.log("secret", this.se)
    console.log("op", this.op)

  }


}
