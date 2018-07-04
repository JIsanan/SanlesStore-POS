import { Component, OnInit, Inject } from '@angular/core';
import { Transaction } from '../add-trans/transaction';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})
export class UpdateTransactionComponent implements OnInit {

  uTrans = new Transaction(1,'',0,0);

  products;

  holdID;
  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) { 
    console.log(this.data.ID);
    this.admin.getCertainTransURL = 'http://localhost:9000/transaction/'+this.data.ID+'/';
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
          this.uTrans.buyer_name = res.product.buyerName;
          this.uTrans.quantity = res.product.quantity;
          this.uTrans.product_id = res.product.product.id;
          this.holdID = res.product.id;
        }
      );
    }
  }

  onSubmit(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.updateCertainTransURL = 'http://localhost:9000/editTransaction/'+this.holdID+'/';
      this.admin.updatedTransBody = this.uTrans;
      this.admin.updateCertainTransFunc().subscribe(
        res=>{
          console.log('SUCCESS!');
        }
      );
    }
  }
}
