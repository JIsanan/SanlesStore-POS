import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.css']
})
export class AddTransComponent implements OnInit {

  constructor(public admin:AdminService) { }

  trans = new Transaction(1,'',0,0);

  selected;

  products;

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getProductsFunc().subscribe(
        res=>{
          console.log(res);
          this.products = res;
        }
      );
    }
  }

  get diagnostic() { return JSON.stringify(this.trans); }

  onSubmit(){
    this.addFunc();
  }

  addFunc(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.transactionBody = this.trans;
      this.admin.addTransactionFunc().subscribe(
        res=>{
          console.log(res);
        }
      );
    }
  }
}
