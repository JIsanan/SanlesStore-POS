import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ViewTransDataSource } from './view-trans-datasource';
import { UpdateTransactionComponent } from '../update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from '../delete-transaction/delete-transaction.component';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin.service';
import { TransDetailsComponent } from 'src/app/POS/trans-details/trans-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'view-trans',
  templateUrl: './view-trans.component.html',
  styleUrls: ['./view-trans.component.css']
})
export class ViewTransComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 
  currentPage=0;
  pos;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'buyerName','prodQty','prodName','Total Price','update','delete','showDetails'];
  search = new FormControl();
  searchCategory = [
    {value: 'Transaction Name', viewValue: 'Transaction Name'},
    
  ];
  
  options = [];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    
    this.filteredOptions = this.search.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
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
  
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  constructor(public snackBar:MatSnackBar,public updateDialog:MatDialog,public deleteDialog:MatDialog,public admin:AdminService,public router:Router){
    if(localStorage.getItem('token')){
      this.checkIfEmployee();
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getTransactionsUrl = 'http://localhost:9000/transaction/0/';
      this.admin.transDataSource = new ViewTransDataSource(this.admin);
      this.admin.getTransactionsFunc().subscribe(
        res=>{
          console.log(res);
          
          for(let i=0;i<res.length;i++){
            
            this.options.push(res[i].buyerName);
          }
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  openDetailDialog(e:any):void{
    
    this.admin.getCurrUserFunc().subscribe(
      res=>{
        this.pos = res.user.position.typeName;
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          let dialogRef = this.updateDialog.open(TransDetailsComponent, {
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

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }

  openUpdateDialog(e:any):void{
    console.log(e);
    let dialogRef = this.updateDialog.open(UpdateTransactionComponent, {
      width: '80%',
      height:'350',
      data: {ID:e.target.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openDeleteDialog(e:any):void{
    let dialogRef = this.deleteDialog.open(DeleteTransactionComponent,{
      width:'20%',
      height:'100',
      data:{ID:e.target.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  displaySearch(){
    this.admin.getTransactionsUrl = 'http://localhost:9000/gettransactionbuyer/'+this.search.value+'/';
    this.admin.transDataSource = new ViewTransDataSource(this.admin);
  }

  getBack(){
    if(this.currentPage>0){
      this.currentPage--;
      this.admin.getProductsUrl = 'http://localhost:9000/transaction/'+this.currentPage+'/';
      this.admin.transDataSource =  new ViewTransDataSource(this.admin);
    }else{
      
    }

  }

  getMore(){

    this.currentPage++;
    this.admin.getProductsUrl = 'http://localhost:9000/transaction/'+this.currentPage+'/';

    this.admin.getProductsFunc().subscribe(
      res=>{
       console.log("Response Length"+res.length);
       if(res.length == 0 ){
         this.currentPage--;
       }else if(res.length <= 10){
        this.admin.transDataSource = new ViewTransDataSource(this.admin);
       }
      }
    );
    console.log("Current Page NUmber"+this.currentPage);
  }
  
  navToArchive(){
    this.router.navigate(['/mynav/archiveTrans']);
  }
  
}
