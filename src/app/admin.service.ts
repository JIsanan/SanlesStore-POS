import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewProdItem } from './POS/view-prod/view-prod-datasource';
import { product_type } from './POS/add-product-type/product_type';
import { Product } from './POS/add-product/product';
import { Transaction } from './POS/add-trans/transaction';
import { User } from './POS/add-users/users';
import { uType } from './POS/add-user-type/userType';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http:HttpClient;
  constructor(http:HttpClient) { 
    this.http = http;
  }

  message:String;
  redirectURL:string;
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

  updatedUserBody:User;

  updatedUserTypeBody:uType;

  userTypeBody:uType;

  getUserTypesURL='http://localhost:9000/userType/0/';

  getTodayRevenu = 'http://localhost:9000/retrieveSales/2/';

  getYearlyUrl = 'http://localhost:9000/retrieveSales/0/';

  getProductsUrl = 'http://localhost:9000/product/0/';

  loginUrl = 'http://localhost:9000/login/';

  getTransactionsUrl = 'http://localhost:9000/transaction/0/';

  deleteTransactionsURL = 'http://localhost:9000/deleteTransaction/:id/';

  deleteProductURL = 'http://localhost:9000/deleteProduct/:id/';

  deleteProductTypeURL = 'http://localhost:9000/deleteProductType/:id/';

  deleteUserURL = 'http://localhost:9000/delete/:id/';

  addProdTypeURL = 'http://localhost:9000/addProductType/';

  getProductTypeUrl = 'http://localhost:9000/productType/0/';
  
  addProductUrl = 'http://localhost:9000/addProduct/';

  getCertainProductUrl = 'http://localhost:9000/getproduct/:id/';

  updateProductURL = 'http://localhost:9000/editProduct/:id/';

  updateProductTypeURL = 'http://localhost:9000/editProductType/:id/';

  addTransactionURL = 'http://localhost:9000/addTransaction/';

  getUsersURL = 'http://localhost:9000/0/';

  adduserURL = 'http://localhost:9000/adduser/';

  getCertainTransURL = 'http://localhost:9000/gettransaction/:id/';

  updateCertainTransURL = 'http://localhost:9000/editTransaction/:id/';

  updateUserURL = 'http://localhost:9000/edit/:id/';

  getCertainUserURL = 'http://localhost:9000/getuser/:id/';

  getCurrUserURL = 'http://localhost:9000/getuser';

  getMonthSaleURL = 'http://localhost:9000/retrieveSales/1/';

  updateUserTypeURL = 'http://localhost:9000/editUserType/:id/';

  deleteUserTypeURL = 'http://localhost:9000/deleteUserType/:id/';

  addUserTypeURL = 'http://localhost:9000/addUserType/';

  getDetailsURL = 'http://localhost:9000/getdetails/:id/';

  retrieveDeletedProductsURL = 'http://localhost:9000/product/deleted/0/';

  retrieveDeletedUsersURL = 'http://localhost:9000/deleted/0/';

  retrieveDeletedProdTypesURL = 'http://localhost:9000/productType/deleted/0/';

  retrieveDeletedTransURL = 'http://localhost:9000/transaction/deleted/0/';

  retrieveDeletedUserTypeURL = 'http://localhost:9000/userType/deleted/0/';

  retrieveCertainProdTypeURL = 'http://localhost:9000/retrieveproductType/:id/';

  retrieveCertainUserTypeURL = 'http://localhost:9000/retrieveuserType/:id/';

  retrieveCertainUserTypeFunc():Observable<any>{
    return this.http.get(this.retrieveCertainUserTypeURL,this.httpOptions);
  }

  retrieveCertainProdTypeFunc():Observable<any>{
    return this.http.get(this.retrieveCertainProdTypeURL,this.httpOptions);
  }
  retrieveDeletedUserTypeFunc():Observable<any>{
    return this.http.get(this.retrieveDeletedUserTypeURL,this.httpOptions);
  }
  retrieveDeletedTransFunc():Observable<any>{
    return this.http.get(this.retrieveDeletedTransURL,this.httpOptions);
  }
  retrieveDeletedProdTypesFunc():Observable<any>{
    return this.http.get(this.retrieveDeletedProdTypesURL,this.httpOptions);
  }
  retreiveDeletedUsersFunc():Observable<any>{
    return this.http.get(this.retrieveDeletedUsersURL,this.httpOptions);
  }
  retrieveDeletedProductsFunc():Observable<any>{
    return this.http.get(this.retrieveDeletedProductsURL,this.httpOptions);
  }
  getDetailsFunc():Observable<any>{
    return this.http.get(this.getDetailsURL,this.httpOptions);
  }
  addUserTypeFunc():Observable<any>{
    return this.http.post(this.addUserTypeURL,this.userTypeBody,this.httpOptions);
  }
  deleteUserTypeFunc():Observable<any>{
    return this.http.get(this.deleteUserTypeURL,this.httpOptions);
  }
  updateUserTypeFunc():Observable<any>{
    return this.http.post(this.updateUserTypeURL,this.updatedUserTypeBody,this.httpOptions);
  }
  getUserTypeFunc():Observable<any>{
    return this.http.get(this.getUserTypesURL,this.httpOptions);
  }

  getMonthSaleFunc():Observable<any>{
    return this.http.get(this.getMonthSaleURL,this.httpOptions);
  }
  getTodayFunc():Observable<any>{
    return this.http.get(this.getTodayRevenu,this.httpOptions);
  }
  getYearlyFunc():Observable<any>{
    return this.http.get(this.getYearlyUrl,this.httpOptions);
  }
  getCurrUserFunc():Observable<any>{
    return this.http.get(this.getCurrUserURL,this.httpOptions);
  }
  
  getCertainUserFunc():Observable<any>{
    return this.http.get(this.getCertainUserURL,this.httpOptions);
  }
  updateUserFunc():Observable<any>{
    return this.http.post(this.updateUserURL,this.updatedUserBody,this.httpOptions);
  }
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
