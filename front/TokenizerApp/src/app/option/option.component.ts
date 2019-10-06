import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenifyService } from '../tokenify.service';
import { FileManagerService } from '../file-manager.service';
import { MatSlideToggleChange, MatTable } from '@angular/material';

export interface PeriodicElement {
  name: string;
  fieldName: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
const tks: String[] = ['Symetric encryption', 'Asymentric encryption', 'Obfuscation'];

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  private values;
  constructor(private router: Router, public tokenifyService: TokenifyService, public fileManagerService: FileManagerService) {

  }
  @ViewChild(MatTable, null) table: MatTable<PeriodicElement[]>;
  displayedColumns: string[] = ['position', 'name', 'weight'];

  // TODO quit when work
  //dataSource = ELEMENT_DATA;
  favoriteTk: string;
  nof : string;
  tks: string[] = ['Symetric encryption', 'Asymentric encryption', 'Obfuscation'];

  ngOnInit() {
    if (sessionStorage.getItem("pg")!="1") {
      if(sessionStorage.getItem("token")){
        this.router.navigate(['/core']);
      } else this.router.navigate(['core']);
    }
    this.getListOfFieldsOnTable();
    this.nof = sessionStorage.getItem("nof")
  }

  private getListOfFieldsOnTable() {
    if (!environment.haveFieldData) {
      this.tokenifyService.listTokenifyFields(environment.fileToken);
      setTimeout(() => {
        if(this.tokenifyService.fieldOk){
        this.createElementData();
        } else this.getListOfFieldsOnTable();
      }, 3000);
    } 
    return ELEMENT_DATA;
  }

  nextToD() {
    this.tokenifyService.putTokenifyLinks(environment.fileToken, this.values, this.favoriteTk);
    sessionStorage.setItem("pg","2");
    this.router.navigate(['/download']);
  }

  private getDisplayedColumns() {
    return this.values;
  }
  private createElementData() {
    let i = 0;
    var valuess = new Array(this.tokenifyService.fields.length);
    this.tokenifyService.fields.forEach(function (field) {
      valuess[i] = '0';
      ELEMENT_DATA[i] = { fieldName: i, name: field, weight: 1 };
      console.log(field);
      i++;
    });
    this.values = valuess;
    environment.haveFieldData = true;
    this.dataSource = ELEMENT_DATA;
    this.table.renderRows();
    console.log("data",this.dataSource);
    console.log("values",this.values);
  }

  fieldChangeAction(fieldName: any) {
    console.log ("fieldName",fieldName)
    if (this.values[fieldName] == "0"){
      this.values[fieldName] = "1"
    } else this.values[fieldName] = "0"

    console.log("values",this.values);
    this.tokenifyService.value = JSON.stringify(this.values)
  }

  logout() {
    this.router.navigate(['/']);
  }
}
