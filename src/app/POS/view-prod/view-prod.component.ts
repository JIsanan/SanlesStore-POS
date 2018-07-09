import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewProdDataSource } from './view-prod-datasource';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateProdComponent } from '../update-prod/update-prod.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { FormControl } from '@angular/forms';
import { startWith, map,filter } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { AdminService } from '../../admin.service';

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

  searchContent={
    prodName:''
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','price','update','delete'];
  
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

  constructor(public updateDialog:MatDialog,public deleteDialog:MatDialog,public admin:AdminService){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
    console.log(this.dataSource);
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

  openUpdateDialog(e:any):void{
    console.log(e);
    let dialogRef = this.updateDialog.open(UpdateProdComponent, {
      width: '80%',
      height:'350',
      data: {ID:e.target.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openDeleteDialog(e:any):void{
    console.log(e.target.name);
    let dialogRef = this.deleteDialog.open(DeleteProductComponent,{
      width:'20%',
      height:'100',
      data:{ID:e.target.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  // dataFilter(){
  //     for(let i=0;i<this.dataSource;i++){
  //       if(item.)
  //     }
  // }


  getMore(){
    this.currentPage++;
    this.admin.getProductsUrl = 'http://localhost:9000/product/'+this.currentPage+'/';
    
    this. dataSource =  new ViewProdDataSource(this.admin);
    
    console.log("IT WORKED");
  }

  getBack(){
    this.currentPage--;
    this.admin.getProductsUrl = 'http://localhost:9000/product/'+this.currentPage+'/';
    this. dataSource =  new ViewProdDataSource(this.admin);

  }

  displaySearch(){
    this.admin.getProductsUrl = 'http://localhost:9000/getproductname/'+this.search.value+'/';
    this.dataSource = new ViewProdDataSource(this.admin);
  }

}
