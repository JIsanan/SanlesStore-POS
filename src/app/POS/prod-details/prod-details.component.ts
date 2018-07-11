import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.scss']
})
export class ProdDetailsComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.admin.getCertainProductUrl = 'http://localhost:9000/getproduct/'+this.data.ID+'/';
    console.log(this.admin.getCertainProductUrl);
    this.showCertainProd();
  }
   
  ngOnInit() {
  }
  prod:any;

  showCertainProd(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCertainProductFunc().subscribe(
        res=>{
          console.log('Regine');
          console.log(res);
        
          this.prod = res;
          console.log(this.prod);
        }
      );
    }
  }

}
