import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface PeriodicElement {
  name: string;
  fieldName: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {fieldName: 1, name: 'Test', weight: 1.0079},
  {fieldName: 2, name: 'Test', weight: 4.0026},
  {fieldName: 3, name: 'Test', weight: 6.941},
  {fieldName: 4, name: 'Test', weight: 9.0122},
  {fieldName: 5, name: 'Test', weight: 10.811},
  {fieldName: 6, name: 'Test', weight: 12.0107},
  {fieldName: 7, name: 'Test', weight: 14.0067},
  {fieldName: 8, name: 'Test', weight: 15.9994},
  {fieldName: 9, name: 'Test', weight: 18.9984},
  {fieldName: 10, name: 'Test', weight: 20.1797},
];

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  constructor(private router:Router) { }
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  favoriteTk: string;
  tks: string[] = ['Symetric encryption', 'Asymentric encryption', 'Obfuscation'];

  ngOnInit() {
  }

  nextToD(){
    this.router.navigate(['/download']);
  }

}
