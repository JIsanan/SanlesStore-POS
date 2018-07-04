import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewUsersDataSource } from './view-users-datasource';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import { DeleteUserComponent } from 'src/app/POS/delete-user/delete-user.component';

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewUsersDataSource = new ViewUsersDataSource(this.admin);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'user','position','password','update','delete'];

  searchCategory = [
    {value: 'Product Name', viewValue: 'Product Name'},
    {value: 'Product Category', viewValue: 'Product Category'},
    {value: 'Product Name', viewValue: 'Product Price'}
  ];

  constructor(public admin:AdminService,public updateDialog:MatDialog,public deleteDialog:MatDialog){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));

  }
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

  // openUpdateDialog(e:any):void{
  //   console.log(e);
  //   let dialogRef = this.updateDialog.open(UpdateProdComponent, {
  //     width: '80%',
  //     height:'350',
  //     data: {ID:e.target.name}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
      
  //   });
  // }

  openDeleteDialog(e:any):void{
    console.log(e.target.name);
    let dialogRef = this.deleteDialog.open(DeleteUserComponent,{
      width:'20%',
      height:'100',
      data:{ID:e.target.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
