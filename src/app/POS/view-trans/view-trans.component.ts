import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewTransDataSource } from './view-trans-datasource';
import { UpdateTransactionComponent } from '../update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from '../delete-transaction/delete-transaction.component';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'view-trans',
  templateUrl: './view-trans.component.html',
  styleUrls: ['./view-trans.component.css']
})
export class ViewTransComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewTransDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'buyerName','companyName','prodQuant','prodName','update','delete'];
  search = new FormControl();
  searchCategory = [
    {value: 'Product Name', viewValue: 'Product Name'},
    {value: 'Product Category', viewValue: 'Product Category'},
    {value: 'Product Name', viewValue: 'Product Price'}
  ];
  
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

  ngOnInit() {
    this.dataSource = new ViewTransDataSource(this.paginator, this.sort);
    this.filteredOptions = this.search.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }
  
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  constructor(public updateDialog:MatDialog,public deleteDialog:MatDialog){

  }

  openUpdateDialog(e:any):void{
    console.log(e);
    let dialogRef = this.updateDialog.open(UpdateTransactionComponent, {
      width: '80%',
      height:'350',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openDeleteDialog(e:any):void{
    let dialogRef = this.deleteDialog.open(DeleteTransactionComponent,{
      width:'20%',
      height:'100',
      data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
}
