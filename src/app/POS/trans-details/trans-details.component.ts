import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-trans-details',
  templateUrl: './trans-details.component.html',
  styleUrls: ['./trans-details.component.scss']
})
export class TransDetailsComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.admin.getCertainTransURL = 'http://localhost:9000/gettransaction/'+this.data.ID+'/';
    this.showCertainTrans();
  }

  ngOnInit() {
  }

  trans:any;

  showCertainTrans(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCertainTransFunc().subscribe(
        res=>{
          console.log(res);
          this.trans= res;
        }
      );
    }
  }

}
