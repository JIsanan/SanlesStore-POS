import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/POS/add-product/product';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-update-prod',
  templateUrl: './update-prod.component.html',
  styleUrls: ['./update-prod.component.css']
})
export class UpdateProdComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.admin.getCertainProductUrl = 'http://localhost:9000/product/'+this.data.ID+'/';
    console.log("HELLLLLLLOOOOOOOOOOOOOOOOO");
    this.showCertainProd();
    this.panelColor.setValue(this.selected);
  }
  selected;
  panelColor = new FormControl();
  uProd = new Product(1,'',0,0);
  prodTypes;
  holdID:number;

  // uSelected = new Select(this.selected);

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

  showCertainProd(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCertainProductFunc().subscribe(
        res=>{
          console.log('Regine');
          console.log(res);
          this.uProd.product_name = res.product.name;
          this.uProd.price = res.product.price;
          this.uProd.type_id = res.product.type.id;
          this.selected = res.product.type.typeName;
          this.holdID = res.product.id;
          console.log(this.uProd);
          console.log(this.selected);
        }
      );
    }
  }

  onSubmit(){
    if(localStorage.getItem('token')){
      this.admin.updateProductURL = 'http://localhost:9000/editProduct/'+this.holdID+'/';
      console.log(this.uProd);
      this.admin.updatedProductBody = this.uProd;
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.updateProductFunc().subscribe(
        res=>{
          console.log("SUCCESS!!!");
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      );
    }
    
    
  }
}

// export class Select{
//   constructor(public selected:number | String){
    
//   }
  
// }
