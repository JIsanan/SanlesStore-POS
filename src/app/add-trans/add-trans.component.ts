import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
@Component({
  selector: 'app-add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.css']
})
export class AddTransComponent implements OnInit {

  constructor() { }

  trans = new Transaction('',0,'','');

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.trans); }

}
