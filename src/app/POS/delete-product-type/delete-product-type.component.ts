import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ViewProdtypeDataSource } from 'src/app/POS/view-prodtype/view-prodtype-datasource';

@Component({
  selector: 'app-delete-product-type',
  templateUrl: './delete-product-type.component.html',
  styleUrls: ['./delete-product-type.component.scss']
})
export class DeleteProductTypeComponent implements OnInit {

  constructor(public http:HttpClient,public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any,public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.admin.deleteProductTypeURL = 'http://localhost:9000/deleteProductType/'+this.data.ID+'/';
  }

  delete(){
    this.admin.deleteProductTypeFunc().subscribe(
      res=>{
        console.log(res);
        this.admin.prodTypeDataSource = new ViewProdtypeDataSource(this.admin);
        this.openSnackBar("Successfully Deleted!");
       
      },
      err=>{
        this.openSnackBar("Unsuccessful Delete!");
      }
    );
    this.admin
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
