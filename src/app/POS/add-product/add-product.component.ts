import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AdminService } from '../../admin.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public admin:AdminService,public snackBar:MatSnackBar) { }

  prod = new Product(1,'',0,0);

  prodTypes;

  selected;

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getProductTypeFunc().subscribe(
        res=>{
          console.log(res);
          this.prodTypes = res;
         
        },
        err=>{
          console.log(err);
        }
      );
    }
    
  }

  onSubmit(){
    this.prod.type_id = this.selected;
    this.admin.productBody = this.prod;
    console.log(this.admin.productBody);
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.addProductFunc().subscribe(
        res=>{
          if(res.message=="product exists already or product type does not exist or price is an incorrect value"){
            this.openSnackBar("Either Product Type does not Exist or Product Exists or Incorrect Value!");
          }else{
            this.openSnackBar("Successfully Added!");
          }
          console.log(res);
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
