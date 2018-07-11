import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction';
import { AdminService } from '../../admin.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.css']
})
export class AddTransComponent implements OnInit {

  constructor(public admin:AdminService,public snackBar:MatSnackBar) { }

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
          if(res.message == "product does not exist or quantity is invalid"){
            this.openSnackBar("Input invalid check your fields and try again!");
            console.log(res);
          }else{
            this.openSnackBar("Successfully Added");
            console.log(res);
          }
        }
      );
    }
  }
  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
