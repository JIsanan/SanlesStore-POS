import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor() { }

  prod = new Product(1,'','',0);

  ngOnInit() {
  }

}
