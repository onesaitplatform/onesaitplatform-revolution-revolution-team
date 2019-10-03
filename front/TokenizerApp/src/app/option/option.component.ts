import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import {TokenifyService} from '../tokenify.service';

export interface PeriodicElement {
  name: string;
  fieldName: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {fieldName: 0, name: 'Nombre', weight: 1.0079},
  {fieldName: 1, name: 'Nombre', weight: 1.0079},
  {fieldName: 2, name: 'Dni', weight: 4.0026},
  {fieldName: 3, name: 'Dirección', weight: 6.941},
  {fieldName: 4, name: 'Test', weight: 9.0122},
  {fieldName: 5, name: 'Test', weight: 10.811},
  {fieldName: 6, name: 'Test', weight: 12.0107},
  {fieldName: 7, name: 'Test', weight: 14.0067},
  {fieldName: 8, name: 'Test', weight: 15.9994},
  {fieldName: 9, name: 'Test', weight: 18.9984},
  {fieldName: 10, name: 'Test', weight: 20.1797},
];

const tks: String[] = ['Symetric encryption', 'Asymentric encryption', 'Obfuscation'];

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  constructor(private router: Router, protected tokenifyService: TokenifyService ) { }

  displayedColumns: string[] = this.getDisplayedColumns();
  // TODO quit when work
  dataSource  =  this.tokenifyService.listTokenifyFields(environment.fileToken);
  //dataSource = ELEMENT_DATA;
  favoriteTk: string;

  ngOnInit() {

  }

  nextToD() {
    this.tokenifyService.putTokenifyLinks(environment.fileToken, this.displayedColumns, this.favoriteTk);
    this.router.navigate(['/download']);
  }

  private getDisplayedColumns() {
    // TODO return selected fields
    return ['0', '1', '1', '0', '1', '1', '0', '1', '1'];
  }
}
