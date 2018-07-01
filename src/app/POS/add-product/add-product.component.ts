import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public admin:AdminService) { }

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
      console.log("Regine");
      this.admin.addProductFunc().subscribe(
        res=>{
         
          console.log(res);
        }
      );
    }
    
  }

}
