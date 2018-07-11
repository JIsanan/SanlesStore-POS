import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-user-type',
  templateUrl: './delete-user-type.component.html',
  styleUrls: ['./delete-user-type.component.scss']
})
export class DeleteUserTypeComponent implements OnInit {

  holdID;

  constructor(public http:HttpClient,public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { 
    this.holdID = this.data.ID;
  }

  ngOnInit() {
    this.admin.deleteUserTypeURL = 'http://localhost:9000/deleteUserType/'+this.holdID+'/';
    console.log(this.admin.deleteUserTypeURL);
  }

  delete(){
    this.admin.deleteUserTypeFunc().subscribe(
      res=>{
        this.openSnackBar("Successfully Deleted!");
      },
      err=>{
        this.openSnackBar("Unsuccessful Delete!");
      }
    );
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
