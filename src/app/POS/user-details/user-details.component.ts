import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.admin.getUserDeetsURL = 'http://localhost:9000/getdetails/'+this.data.ID+'/'; 
    this.showCertainTrans();
  }

  ngOnInit() {
  }
  user;

  showCertainTrans(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getUserDeetsFunc().subscribe(
        res=>{
          console.log(res);
          this.user = res;
        }
      );
    }
  }
}
