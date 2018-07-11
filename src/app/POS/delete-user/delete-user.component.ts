import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(public http:HttpClient,public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.admin.deleteUserURL = 'http://localhost:9000/delete/'+this.data.ID+'/';
  }

  delete(){
    this.admin.deleteUserFunc().subscribe(
      res=>{
        console.log(res);
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