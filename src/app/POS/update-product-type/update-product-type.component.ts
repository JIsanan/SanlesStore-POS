import { Component, OnInit, Inject } from '@angular/core';
import { product_type } from 'src/app/POS/add-product-type/product_type';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.scss']
})

export class UpdateProductTypeComponent implements OnInit {

  uProdType = new product_type(1,'');
  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) {
    
    console.log("BAYANG MAGILIW");
    console.log(this.data.productTypeName);
    this.uProdType.type_name = this.data.productTypeName;
    this.uProdType.type_id = this.data.ID;
    console.log(this.data.ID);
   }

  ngOnInit() {
  }

  onSubmit(){
    this.update();
  }

  update(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.updatedProductTypeBody = this.uProdType;
      console.log(this.admin.updatedProductTypeBody);
      this.admin.updateProductTypeURL = 'http://localhost:9000/editProductType/'+this.uProdType.type_id+'/';
      console.log(this.admin.updateProductTypeURL);
      this.admin.updateProductTypeFunc().subscribe(
        res=>{
          console.log(res);
        }
      );
    }
  }
}
