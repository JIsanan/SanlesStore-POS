import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-type-details',
  templateUrl: './user-type-details.component.html',
  styleUrls: ['./user-type-details.component.scss']
})
export class UserTypeDetailsComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) {
    
   }

  ngOnInit() {
    this.showCertainUserType();
  }

  userType;

  showCertainUserType(){
    if(localStorage.getItem('token')){
      this.admin.retrieveCertainUserTypeURL = 'http://localhost:9000/retrieveuserType/'+this.data.ID+'/';
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.retrieveCertainUserTypeFunc().subscribe(
        res=>{
          console.log(res);
          this.userType= res;
        }
      );
    }
  }
}
