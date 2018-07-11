import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.css']
})
export class DeleteTransactionComponent implements OnInit {

  constructor(public http:HttpClient,public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.admin.deleteTransactionsURL = 'http://localhost:9000/deleteTransaction/'+this.data.ID+'/';
  }

  delete(){
    this.admin.deleteTransFunc().subscribe(
      res=>{
        console.log(res);
        this.openSnackBar("Succecssfully Deleted!");
      },
      err=>{
        console.log(err);
        this.openSnackBar("Unsuccessful Deletion!");
      }
    );
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }

}
