import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewProdItem } from './POS/view-prod/view-prod-datasource';
import { product_type } from './POS/add-product-type/product_type';
import { Product } from './POS/add-product/product';
import { Transaction } from './POS/add-trans/transaction';
import { User } from './POS/add-users/users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http:HttpClient;
  constructor(http:HttpClient) { 
    this.http = http;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  
  body={
    username:'admin',
    password:'test1234'
  }
  
  prodTypeBody:product_type;

  productBody:Product;

  updatedProductBody:Product;

  updatedProductTypeBody:product_type;

  transactionBody:Transaction;

  updatedTransBody:Transaction;

  userBody:User;

  getProductsUrl = 'http://localhost:9000/product/';

  loginUrl = 'http://localhost:9000/login/';

  getTransactionsUrl = 'http://localhost:9000/transaction/';

  deleteTransactionsURL = 'http://localhost:9000/deleteTransaction/:id/';

  deleteProductURL = 'http://localhost:9000/deleteProduct/:id/';

  deleteProductTypeURL = 'http://localhost:9000/deleteProductType/:id/';

  deleteUserURL = 'http://localhost:9000/delete/:id/';

  addProdTypeURL = 'http://localhost:9000/addProductType/';

  getProductTypeUrl = 'http://localhost:9000/productType/';
  
  addProductUrl = 'http://localhost:9000/addProduct/';

  getCertainProductUrl = 'http://localhost:9000/product/:id/';

  updateProductURL = 'http://localhost:9000/editProduct/:id/';

  updateProductTypeURL = 'http://localhost:9000/editProductType/:id/';

  addTransactionURL = 'http://localhost:9000/addTransaction/';

  getUsersURL = 'http://localhost:9000/';

  adduserURL = 'http://localhost:9000/adduser/';

  getCertainTransURL = 'http://localhost:9000/transaction/:id/';

  updateCertainTransURL = 'http://localhost:9000/editTransaction/:id/';

  updateCertainTransFunc():Observable<any>{
    return this.http.post(this.updateCertainTransURL,this.updatedTransBody,this.httpOptions);
  }
  getCertainTransFunc():Observable<any>{
    return this.http.get(this.getCertainTransURL,this.httpOptions);
  }
  deleteTransFunc():Observable<any>{
    return this.http.get(this.deleteTransactionsURL,this.httpOptions);
  }
  addUserFunc():Observable<any>{
    return this.http.post(this.adduserURL,this.userBody,this.httpOptions);
  }
  getUsersFunc():Observable<any>{
    return this.http.get(this.getUsersURL,this.httpOptions);
  }
  addTransactionFunc():Observable<any>{
    return this.http.post(this.addTransactionURL,this.transactionBody,this.httpOptions);
  }
  updateProductTypeFunc():Observable<any>{
    return this.http.post(this.updateProductTypeURL,this.updatedProductTypeBody,this.httpOptions);
  }

  deleteProductTypeFunc():Observable<any>{
    return this.http.get(this.deleteProductTypeURL,this.httpOptions);
  }
  updateProductFunc():Observable<any>{
    return this.http.post(this.updateProductURL,this.updatedProductBody,this.httpOptions);
  }
  addProductFunc():Observable<any>{
    return this.http.post(this.addProductUrl,this.productBody,this.httpOptions);
  }

  addProductTypeFunc():Observable<any>{
    return this.http.post(this.addProdTypeURL,this.prodTypeBody,this.httpOptions);
  }
  getTransactionsFunc():Observable<any>{
    return this.http.get(this.getTransactionsUrl,this.httpOptions);
  }

  loginFunc():Observable<any>{
    return this.http.post(this.loginUrl,this.body,this.httpOptions);
  }

  getProductsFunc():Observable<any>{
    return this.http.get<ViewProdItem[]>(this.getProductsUrl,this.httpOptions);
  }

  deleteProdFunc():Observable<any>{
    return this.http.get(this.deleteProductURL,this.httpOptions);
  }

  getProductTypeFunc():Observable<any>{
    return this.http.get(this.getProductTypeUrl,this.httpOptions);
  }

  getCertainProductFunc():Observable<any>{
    return this.http.get(this.getCertainProductUrl,this.httpOptions);
  }

  
  deleteUserFunc():Observable<any>{
    return this.http.get(this.deleteUserURL,this.httpOptions);
  }

}
