import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(public http:HttpClient,public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { 
    
  }
  ngOnInit(){
    console.log("HELLO");
    this.admin.deleteProductURL = 'http://localhost:9000/deleteProduct/'+this.data.ID+'/';
  }

  delete(){
    this.admin.deleteProdFunc().subscribe(
      res=>{
        console.log(res);
        this.openSnackBar("Delete Successful");
      },
      err=>{
        console.log(err);
        this.openSnackBar("Error:Delete Unsuccessful");
      }
    );
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
