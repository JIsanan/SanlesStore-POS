import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AdminService } from '../../admin.service';
import { uType } from 'src/app/POS/add-user-type/userType';

@Component({
  selector: 'app-add-user-type',
  templateUrl: './add-user-type.component.html',
  styleUrls: ['./add-user-type.component.scss']
})
export class AddUserTypeComponent implements OnInit {


  constructor(public admin:AdminService,public snackBar:MatSnackBar) { }

  userType = new uType('',1);

  ngOnInit() {
  }

  onSubmit(){
    this.admin.userTypeBody = this.userType;
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.addUserTypeFunc().subscribe(
        res=>{
          this.openSnackBar("Successfully Added!");
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
