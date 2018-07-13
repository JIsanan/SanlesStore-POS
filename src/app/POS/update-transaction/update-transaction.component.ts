import { Component, OnInit, Inject } from '@angular/core';
import { Transaction } from '../add-trans/transaction';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ViewTransDataSource } from 'src/app/POS/view-trans/view-trans-datasource';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})
export class UpdateTransactionComponent implements OnInit {

  uTrans = new Transaction(1,'',0,0);

  products;

  holdID;
  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { 
    console.log(this.data.ID);
    this.admin.getCertainTransURL = 'http://localhost:9000/gettransaction/'+this.data.ID+'/';
    
    this.showCertainTrans();
  }

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

  showCertainTrans(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCertainTransFunc().subscribe(
        res=>{
          console.log(res);
          this.uTrans.buyer_name = res.buyerName;
          this.uTrans.quantity = res.quantity;
          this.uTrans.product_id = res.product.id;
          this.holdID = res.id;
        }
      );
    }
  }

  onSubmit(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.updateCertainTransURL = 'http://localhost:9000/editTransaction/'+this.holdID+'/';
      this.admin.updatedTransBody = this.uTrans;
      this.admin.updatedTransBody.trans_id = 1;
      this.admin.updateCertainTransFunc().subscribe(
        res=>{
          console.log('SUCCESS!');
          this.admin.transDataSource = new ViewTransDataSource(this.admin);
          this.openSnackBar("Successfully Updated!");

        },
        err=>{
          console.log(err);
          this.openSnackBar("Update Unsuccessful!");
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
