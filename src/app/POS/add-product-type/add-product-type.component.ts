import { Component, OnInit } from '@angular/core';
import { product_type } from './product_type';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss']
})
export class AddProductTypeComponent implements OnInit {

  constructor(public admin:AdminService) { }

  prodType = new product_type(1,'');
  ngOnInit() {
  }

  onSubmit(){
    this.admin.prodTypeBody = this.prodType;

    this.admin.addProductTypeFunc().subscribe(
      res=>{
        console.log(res);
      }
    );
  }

}
