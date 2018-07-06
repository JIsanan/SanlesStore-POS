import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/POS/add-users/users';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  constructor(public admin:AdminService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.admin.getCertainUserURL = 'http://localhost:9000/getuser/'+this.data.ID+'/';
    this.showCertainTrans();
   }

  userModel = new User(1,'','','');
  positions:string[] = ['manager','employee','admin'];
  selected:String;
  holdID;

  ngOnInit() {
  }

  showCertainTrans(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCertainUserFunc().subscribe(
        res=>{
          console.log(res);
          this.userModel.password = res.user.password;
          this.userModel.username = res.user.user;
          this.userModel.position = res.user.position;
          this.userModel.userID = res.user.id;
          this.holdID = res.user.id;
        }
      );
    }
  }

  onSubmit(){
    this.updateUser();
  }

  updateUser(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.updateUserURL = 'http://localhost:9000/edit/'+this.holdID+'/';
      this.admin.updatedUserBody = this.userModel;
      this.admin.updateUserFunc().subscribe(
        res=>{
          console.log("SUCCESS");
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      );
    }
  }
}
