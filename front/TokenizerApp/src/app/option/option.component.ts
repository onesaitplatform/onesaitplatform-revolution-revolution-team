import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenifyService } from '../tokenify.service';
import { FileManagerService } from '../file-manager.service';
import {MatSlideToggleChange, MatTable} from '@angular/material';

export interface PeriodicElement {
  name: string;
  fieldName: number;
  weight: number;
}
/*
const ELEMENT_DATA: PeriodicElement[] = [
{fieldName: 0, name: " ['id'", weight: 1},
{fieldName: 1, name: " 'name'", weight: 1},
{fieldName: 2, name: " 'host_id'", weight: 1},
{fieldName: 3, name: " 'host_name'", weight: 1},
  {fieldName: 4, name: " 'neighbourhood_group'", weight: 1},
{fieldName: 5, name: " 'neighbourhood'", weight: 1},
{fieldName: 6, name: " 'latitude'", weight: 1},
 {fieldName: 7, name: " 'longitude'", weight: 1},
{fieldName: 8, name: " 'room_type'", weight: 1},
{fieldName: 9, name: " 'price'", weight: 1},
 {fieldName: 10, name: " 'minimum_nights'", weight: 1},
 {fieldName: 11, name: " 'number_of_reviews'", weight: 1},
 {fieldName: 12, name: " 'last_review'", weight: 1},
 {fieldName: 13, name: " 'reviews_per_month'", weight: 1},
 {fieldName: 14, name: " 'calculated_host_listings_count'", weight: 1},
 {fieldName: 15, name: " 'availability_365\\n']} ", weight: 1}];*/
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
  constructor(private router: Router, protected tokenifyService: TokenifyService, protected fileManagerService: FileManagerService ) {
    this.getListOfFieldsOnTable();
  }
  @ViewChild(MatTable, null) table: MatTable<PeriodicElement[]>;
  displayedColumns: string[] = ['position', 'name', 'weight'];

  // TODO quit when work
  //dataSource = ELEMENT_DATA;
  favoriteTk: string;
  tks: string[] = ['Symetric encryption', 'Asymentric encryption', 'Obfuscation'];

  ngOnInit() {
    this.getListOfFieldsOnTable();
  }

  private getListOfFieldsOnTable() {
    if (!environment.haveFieldData) {
      this.tokenifyService.listTokenifyFields(environment.fileToken);
      setTimeout(() => {
        this.createElementData();
      }, 10000);
    }
    return ELEMENT_DATA;
  }

  nextToD() {
    this.tokenifyService.putTokenifyLinks(environment.fileToken,  this.values, this.favoriteTk);
    this.router.navigate(['/download']);
  }

  private getDisplayedColumns() {
    return this.values;
  }
  private createElementData() {
    let i = 0;
    var valuess = new Array(this.tokenifyService.fields.length);
    this.tokenifyService.fields.forEach( function(field) {
        valuess[i] = '0';
        ELEMENT_DATA[i] = {fieldName: i, name: field, weight: 1};
        console.log(field);
        i++;
    });
    this.values = valuess;
    environment.haveFieldData = true;
    this.dataSource = ELEMENT_DATA;
    this.table.renderRows();
  }

  fieldChangeAction( fieldName: any) {
    if (this.values[parseInt(fieldName, 10 )] === '1') {
      this.values[parseInt(fieldName, 10 )] = '0';
    } else {
      this.values[parseInt(fieldName, 10 )] = '1';
    }

  }
}
