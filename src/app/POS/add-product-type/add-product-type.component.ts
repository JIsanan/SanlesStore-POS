import { Component, OnInit } from '@angular/core';
import { product_type } from './product_type';
import { AdminService } from '../../admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss']
})
export class AddProductTypeComponent implements OnInit {

  constructor(public admin:AdminService,public snackBar:MatSnackBar) { }

  prodType = new product_type(1,'');
  ngOnInit() {
  }

  onSubmit(){
    this.admin.prodTypeBody = this.prodType;
    if(this.prodType.type_name == ''){
      this.openSnackBar("Blank Input");
    }else{
      if(localStorage.getItem('token')){
        this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
        this.admin.addProductTypeFunc().subscribe(
          res=>{
            this.openSnackBar("Successfully Added!");
            console.log(res);
          }
        );
      }
    }
  
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }

}
