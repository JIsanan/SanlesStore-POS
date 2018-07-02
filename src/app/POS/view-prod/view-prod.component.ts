import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewProdDataSource } from './view-prod-datasource';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateProdComponent } from '../update-prod/update-prod.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  data:Object[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','price','update','delete'];
  
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

  constructor(public updateDialog:MatDialog,public deleteDialog:MatDialog,public admin:AdminService){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
    // this.admin.getProductsFunc().subscribe(
    //   res=>{
    //     this.data = res;
    //     console.log(this.data);
       
    //   }
    // );
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
}
