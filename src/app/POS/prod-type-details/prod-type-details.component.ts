import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prod-type-details',
  templateUrl: './prod-type-details.component.html',
  styleUrls: ['./prod-type-details.component.scss']
})
export class ProdTypeDetailsComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.admin.retrieveCertainProdTypeURL = 'http://localhost:9000/retrieveproductType/'+this.data.ID+'/';
   }

  ngOnInit() {
    this.showCertainProdType();
  }

  prodType;

  showCertainProdType(){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
    this.admin.retrieveCertainProdTypeFunc().subscribe(
      res=>{
        console.log(res);
        this.prodType = res;
      }
    );
  }

}
