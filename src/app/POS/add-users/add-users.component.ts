import { Component, OnInit } from '@angular/core';
import { User } from './users';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  constructor(public admin:AdminService) { }

  userModel = new User(1,'','','');

  ngOnInit() {
  }

  onSubmit(){
    this.addUser();
  }

  addUser(){
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.userBody = this.userModel;
      this.admin.addUserFunc().subscribe(
        res=>{
          console.log(res);
        }
      );
    }
  }
}
