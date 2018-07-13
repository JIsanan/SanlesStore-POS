import { Component, OnInit } from '@angular/core';
import { User } from './users';
import { AdminService } from '../../admin.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  constructor(public admin:AdminService,public snackBar:MatSnackBar) { }

  userModel = new User(1,'','','');

  positions:string[] = ['manager','employee','admin'];
  
  selected = 'None';

  ngOnInit() {
  }

  onSubmit(){
    this.addUser();
  }

  addUser(){
    if(this.userModel.password == '' || this.userModel.username=='' || this.userModel.position == ''){
      this.openSnackBar("Blank Input");
    }else{
      if(localStorage.getItem('token')){
        this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
        this.admin.userBody = this.userModel;
        this.admin.addUserFunc().subscribe(
          res=>{
            console.log(res);
            this.openSnackBar("Successfully Added!");
          }
        );
      }
    }
    
  }

  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
