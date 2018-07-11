import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ViewUsersDataSource } from './view-users-datasource';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import { DeleteUserComponent } from 'src/app/POS/delete-user/delete-user.component';
import { UpdateUserComponent } from 'src/app/POS/update-user/update-user.component';
import { UserDetailsComponent } from 'src/app/POS/user-details/user-details.component';

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
  displayedColumns = ['id', 'user','position','password','update','delete','showDetails'];
  currentPage:number = 0;
  searchCategory = [
    {value: 'Username', viewValue: 'Username'},
  ];
  pos;

  constructor(public snackBar:MatSnackBar,public admin:AdminService,public updateDialog:MatDialog,public deleteDialog:MatDialog){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
    this.admin.getUsersURL = 'http://localhost:9000/0/';
    this.dataSource = new ViewUsersDataSource(this.admin);

    this.admin.getUsersFunc().subscribe(
      res=>{
        console.log(res);
        for(let i=0;i<res.length;i++){
          this.options.push(res[i].user);
        }
      }
    );
  }
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

  openDetailDialog(e:any):void{
    
    this.admin.getCurrUserFunc().subscribe(
      res=>{
        this.pos = res.user.position.typeName;
        if(this.pos == 'employee'){
          this.openSnackBar("Unauthorized Action");
        }else{
          let dialogRef = this.updateDialog.open(UserDetailsComponent, {
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
    console.log(e);
    let dialogRef = this.updateDialog.open(UpdateUserComponent, {
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
    let dialogRef = this.deleteDialog.open(DeleteUserComponent,{
      width:'20%',
      height:'100',
      data:{ID:e.target.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  displaySearch(){
    console.log("GOT IN");
    this.admin.getUsersURL = 'http://localhost:9000/getusername/'+this.search.value+'/';
    this.dataSource = new ViewUsersDataSource(this.admin);
  }

  getMore(){

    this.currentPage++;
    this.admin.getUsersURL = 'http://localhost:9000/'+this.currentPage+'/';

    this.admin.getUsersFunc().subscribe(
      res=>{
       console.log("Response Length"+res.length);
       if(res.length == 0 ){
         this.currentPage--;
       }else if(res.length <= 10){
        this.dataSource = new ViewUsersDataSource(this.admin);
       }
      }
    );
    console.log("Current Page NUmber"+this.currentPage);
  }

  getBack(){
    if(this.currentPage>0){
      this.currentPage--;
      this.admin.getUsersURL = 'http://localhost:9000/'+this.currentPage+'/';
      this. dataSource =  new ViewUsersDataSource(this.admin);
    }else{
      
    }

  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
