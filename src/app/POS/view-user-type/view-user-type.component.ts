import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewUserTypeDataSource } from './view-user-type-datasource';
import { AdminService } from '../../admin.service';
import { UpdateUserTypeComponent } from 'src/app/POS/update-user-type/update-user-type.component';
import { DeleteTransactionComponent } from 'src/app/POS/delete-transaction/delete-transaction.component';
import { DeleteUserTypeComponent } from 'src/app/POS/delete-user-type/delete-user-type.component';
import { Router } from '@angular/router';
import { UserTypeDetailsComponent } from 'src/app/POS/user-type-details/user-type-details.component';

@Component({
  selector: 'view-user-type',
  templateUrl: './view-user-type.component.html',
  styleUrls: ['./view-user-type.component.css']
})
export class ViewUserTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 

  currentPage=0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'typename','update','delete','showDetails'];
  pos;
  constructor(public updateDialog:MatDialog,public deleteDialog:MatDialog,public admin:AdminService,public router:Router){
    if(localStorage.getItem('token')){
      this.checkIfEmployee();
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.userTypeDataSource = new ViewUserTypeDataSource(this.admin);
      // this.admin.getTransactionsFunc().subscribe(
      //   res=>{
      //     console.log(res);
      //   },
      //   err=>{
      //     console.log(err);
      //   }
      // );
    }
  }
  ngOnInit() {
    // this.dataSource = new ViewUserTypeDataSource(this.admin);
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
  
  openUpdateDialog(e:any):void{
    console.log(e);
    let dialogRef = this.updateDialog.open(UpdateUserTypeComponent, {
      width: '80%',
      height:'350',
      data: {ID:e.target.name,userTypeName:e.target.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openDeleteDialog(e:any):void{
    let dialogRef = this.deleteDialog.open(DeleteUserTypeComponent,{
      width:'20%',
      height:'100',
      data:{ID:e.target.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  getMore(){
    this.currentPage++;
    this.admin.getProductsUrl = 'http://localhost:9000/userType/'+this.currentPage+'/';

    this.admin.getUserTypeFunc().subscribe(
      res=>{
       console.log("Response Length"+res.length);
       console.log(res);
       if(res.length == 0 ){
         this.currentPage--;
       }else if(res.length <= 10){
        this.admin.userTypeDataSource = new ViewUserTypeDataSource(this.admin);
       }
      }
    );
    console.log("Current Page Number"+this.currentPage);
  }

  getBack(){
    if(this.currentPage>0){
      this.currentPage--;
      this.admin.getProductsUrl = 'http://localhost:9000/userType/'+this.currentPage+'/';
      this.admin.userTypeDataSource =  new ViewUserTypeDataSource(this.admin);
    }else{
      
    }
  }

  navToArchive(){
    this.router.navigate(['/mynav/archiveUserType']);
  }

  openDetailDialog(e:any):void{
    
    
          let dialogRef = this.updateDialog.open(UserTypeDetailsComponent, {
            width: '80%',
            height:'350',
            data: {ID:e.target.id}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
          });
       
  }
}
