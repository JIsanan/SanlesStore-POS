import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ViewProdDataSource } from './view-prod-datasource';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateProdComponent } from '../update-prod/update-prod.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { FormControl } from '@angular/forms';
import { startWith, map,filter } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { AdminService } from '../../admin.service';
import { ProdDetailsComponent } from 'src/app/POS/prod-details/prod-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'view-prod',
  templateUrl: './view-prod.component.html',
  styleUrls: ['./view-prod.component.css']
})
export class ViewProdComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(AdminService) admin:AdminService;

  dataSource =  new ViewProdDataSource(this.admin);
  currentPage = 0;
  data:Object[];
  prevUrl='';
  nexturl='';
  pos;
  counter=0;
  searchContent={
    prodName:''
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','price','update','delete','showDetails'];
  
  searchCategory = [
    {value: 'Product Name', viewValue: 'Product Name'},
  ];

  search = new FormControl();

  ngOnInit() {
    this.filteredOptions = this.search.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  options = [];

  filteredOptions: Observable<string[]>;

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  constructor(public updateDialog:MatDialog,public deleteDialog:MatDialog,public admin:AdminService,public snackBar:MatSnackBar,public detailDialog:MatDialog,public router:Router){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
    // console.log(this.dataSource);
    this.admin.getProductsUrl = 'http://localhost:9000/product/0/';
    this.dataSource =  new ViewProdDataSource(this.admin);
    this.admin.getProductsFunc().subscribe(
      res=>{
        this.data = res;
        console.log(this.data);
        for(let i=0;i<res.length;i++){
          this.options.push(res[i].name);
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
          let dialogRef = this.updateDialog.open(ProdDetailsComponent, {
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
        console.log(res);
        this.pos = res.user.position.typeName;
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          let dialogRef = this.updateDialog.open(UpdateProdComponent, {
            width: '80%',
            height:'350',
            data: {ID:e.target.name}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
          });
        }
      }
    );
    console.log(e);
  }

  openDeleteDialog(e:any):void{
    console.log(e.target.name);
    this.admin.getCurrUserFunc().subscribe(
      res=>{
        this.pos = res.user.position.typeName;
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          let dialogRef = this.deleteDialog.open(DeleteProductComponent,{
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

  // dataFilter(){
  //     for(let i=0;i<this.dataSource;i++){
  //       if(item.)
  //     }
  // }


  getMore(){

    this.currentPage++;
    this.admin.getProductsUrl = 'http://localhost:9000/product/'+this.currentPage+'/';

    this.admin.getProductsFunc().subscribe(
      res=>{
       console.log("Response Length"+res.length);
       if(res.length == 0 ){
         this.currentPage--;
       }else if(res.length <= 10){
        this.dataSource = new ViewProdDataSource(this.admin);
       }
      }
    );
    console.log("Current Page NUmber"+this.currentPage);
  }

  getBack(){
    if(this.currentPage>0){
      this.currentPage--;
      this.admin.getProductsUrl = 'http://localhost:9000/product/'+this.currentPage+'/';
      this. dataSource =  new ViewProdDataSource(this.admin);
    }else{
      
    }

  }

  displaySearch(){
    this.admin.getProductsUrl = 'http://localhost:9000/getproductname/'+this.search.value+'/';
    this.dataSource = new ViewProdDataSource(this.admin);
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
  
  navToArchive(){
    this.router.navigate(['/mynav/archiveProd']);
  }
}
