import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateProdComponent } from '../update-prod/update-prod.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin.service';
import { ViewProdtypeDataSource } from './view-prodtype-datasource';
import { DeleteProductTypeComponent } from 'src/app/POS/delete-product-type/delete-product-type.component';
import { UpdateProductTypeComponent } from 'src/app/POS/update-product-type/update-product-type.component';
import { ProdTypeDetailsComponent } from 'src/app/POS/prod-type-details/prod-type-details.component';
import { Router } from '@angular/router';


@Component({
  selector: 'view-prodtype',
  templateUrl: './view-prodtype.component.html',
  styleUrls: ['./view-prodtype.component.css']
})
export class ViewProdtypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // dataSource: ViewProdtypeDataSource= new ViewProdtypeDataSource(this.admin);
  pos;
  pageNumbers;
  pageEnd;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'type_name','update','delete','showDetails'];
  currentPage:number=0;

  searchCategory = [
    {value: 'Product Name', viewValue: 'Product Name'},
    {value: 'Product Category', viewValue: 'Product Category'},
    {value: 'Product Name', viewValue: 'Product Price'}
  ];

  search = new FormControl();
  
  ngOnInit() {
    
    this.filteredOptions = this.search.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  constructor(public admin:AdminService,public deleteDialog:MatDialog,public updateDialog:MatDialog,public snackBar:MatSnackBar,public router:Router){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
    this.checkIfEmployee();
    this.admin.prodTypeDataSource = new ViewProdtypeDataSource(this.admin);
    // this.dataSource = new ViewProdtypeDataSource(this.admin);
    this.admin.getProductsFunc().subscribe(
      res=>{
        // this.data = res;
        console.log(res);
       
      }
    );
  }

  isAllowed:boolean;
  checkIfEmployee(){

    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCurrUserFunc().subscribe(
        res=>{
          if(res.user.position.typeName == 'employee' || res.user.position.typeName == 'manager'){
           this.isAllowed = false;
          }else{
            this.isAllowed = true; 
          }
        }
      );
    }
    
  }

  options = [
    'Hydrogen',
   'Helium',
   'Lithium',
   'Beryllium',
   'Boron',
   'Carbon',
  'Nitrogen',
   'Oxygen',
   'Fluorine',
  'Neon',
  'Sodium',
  'Magnesium',
  'Aluminum',
  'Silicon',
  'Phosphorus',
  'Sulfur',
  'Chlorine',
  'Argon',
  'Potassium',
   'Calcium',
  ];

  filteredOptions: Observable<string[]>;

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  openDeleteDialog(e:any):void{
    console.log(e.target.name);
    this.admin.getCurrUserFunc().subscribe(
      res=>{
        this.pos = res.user.position.typeName;
        console.log(res);
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          let dialogRef = this.deleteDialog.open(DeleteProductTypeComponent,{
            width:'20%',
            height:'100',
            data:{ID:e.target.name}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
          });
        }
      }
    );
    
  }

  openDetailDialog(e:any):void{
    
    this.admin.getCurrUserFunc().subscribe(
      res=>{
        this.pos = res.user.position.typeName;
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          let dialogRef = this.updateDialog.open(ProdTypeDetailsComponent, {
            width: '80%',
            height:'350',
            data: {ID:e.target.id}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
          });
        }
      }
    );
    console.log(e);
  }

  openUpdateDialog(e:any):void{
    this.admin.getCurrUserFunc().subscribe(
      res=>{
        this.pos = res.user.position.typeName;
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          console.log(e);
          let dialogRef = this.updateDialog.open(UpdateProductTypeComponent, {
            width: '80%',
            height:'350',
            data: {ID:e.target.name,productTypeName:e.target.id}
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
          });
        }
      }
    );
    

    
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }

  getMore(){

    this.currentPage++;
    this.admin.getProductTypeUrl = 'http://localhost:9000/productType/'+this.currentPage+'/';

    this.admin.getProductTypeFunc().subscribe(
      res=>{
        console.log(res);
       console.log("Response Length"+res.length);
       if(res.length == 0 ){
         this.currentPage--;
       }else if(res.length <= 10){
        this.admin.prodTypeDataSource = new ViewProdtypeDataSource(this.admin);
       }
      }
    );
    console.log("Current Page NUmber"+this.currentPage);
  }

  getBack(){
    if(this.currentPage>0){
      console.log("GET IN");
      this.currentPage--;
      this.admin.getProductTypeUrl = 'http://localhost:9000/productType/'+this.currentPage+'/';
      this.admin.prodTypeDataSource =  new ViewProdtypeDataSource(this.admin);
    }else{
      
    }

  }

  navToArchive(){
    this.router.navigate(['/mynav/archiveProdType']);
  }
}
