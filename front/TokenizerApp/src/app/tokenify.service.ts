import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PeriodicElement } from './option/option.component';

@Injectable({
  providedIn: 'root'
})
export class TokenifyService {
  private resultado;
  private pass: string;
  public fields: string[];

  constructor(protected http: HttpClient) { }

  async putTokenifyLinks(idFile: string, flags: string[] , method: string) {
    // TODO quit with real values
    //flags = ['0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    //idFile = '5d94a4a918b39b000cf1bfd6';
    //method = 'FPE';
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
      environment.tokenfyUrl , body , httpOptions
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
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + environment.token,
        'Accept': '*/*'
      })
    };

    const bodys = {
      params: {
        user: 'anonymous',
        USER_TOKEN: 'Bearer ' + environment.token,
        file_id: idFile
      }
    }

    let bodyp = {};
    let body = {};
    bodyp['user'] = 'anonymous';
    bodyp['USER_TOKEN'] = 'Bearer ' + environment.token;
    bodyp['file_id'] = idFile;
    body['params'] = bodyp;
    const json = JSON.stringify(bodys);
    await this.http.post(
      environment.fieldUrl, JSON.stringify(json), httpOptions
    ).subscribe(
      res => {
        this.resultado = res['body']['results']['msg']['data'];
        this.getFields();
        const json2 = JSON.stringify(  this.resultado);
      }, err => {
        //TODO quit when response go well
        this.resultado = "Info - IotBrokerClient will be soon deprecated, please use DigitalClient instead\\n{'id': '5d97825a18b39b000cf1c14b'," +
          " 'values': ['2539', 'Clean & quiet apt home by the park', '2787', 'John', 'Brooklyn', 'Kensington', '40.64749', '-73.97237', 'Private room', '149', " +
          "'1', '9', '2018-10-19', '0.21', '6', '365\\\\n'], 'fields': ['id', 'name', 'host_id', 'host_name', 'neighbourhood_group', 'neighbourhood', 'latitude'," +
          " 'longitude', 'room_type', 'price', 'minimum_nights', 'number_of_reviews', 'last_review', 'reviews_per_month', 'calculated_host_listings_count', " +
          "'availability_365\\\\n']}\\n(True, '{\\message\\:\"Disconnected\"}')\n";
        this.getFields();
        console.log(err);
      }
    );

    return this.resultado;
  }

  private getFields() {
    this.resultado = this.resultado.replace('\\n(True, \'{\\message\\:"Disconnected"}\')\n', ' ');
    this.resultado = this.resultado.match('\'fields\':(.*)');
    this.fields = this.resultado[1].split(',');
  }

}
