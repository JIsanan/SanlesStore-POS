import { Component, OnInit, Inject } from '@angular/core';
import { uType } from '../add-user-type/userType';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ViewUserTypeDataSource } from 'src/app/POS/view-user-type/view-user-type-datasource';

@Component({
  selector: 'app-update-user-type',
  templateUrl: './update-user-type.component.html',
  styleUrls: ['./update-user-type.component.scss']
})
export class UpdateUserTypeComponent implements OnInit {

  userType = new uType('',1);
  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { 
    this.userType.id = this.data.ID;
    console.log(this.data.ID);
    this.userType.type_name = this.data.userTypeName;
  }

  ngOnInit() {
  }

  onSubmit(){
    this.update();
  }
  
  update(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.updatedUserTypeBody = this.userType;
      
      this.admin.updateUserTypeURL = 'http://localhost:9000/editUserType/'+this.userType.id+'/';
      console.log(this.admin.updateUserTypeURL);
      this.admin.updateUserTypeFunc().subscribe(
        res=>{
          console.log(res);
          this.admin.userTypeDataSource = new ViewUserTypeDataSource(this.admin);
          this.openSnackBar("Successfully Updated!");
        }
      );
    }
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
