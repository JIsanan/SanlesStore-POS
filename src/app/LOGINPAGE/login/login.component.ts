import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { loginBody } from './login';
import { FormControl,FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare var particlesJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    
  constructor(public router:Router ,public admin:AdminService,private fb:FormBuilder,public snackBar:MatSnackBar) { 
    this.createForm();
  }

  ngOnInit() {
    

  }
  user:loginBody= new loginBody('10','');
  
  nav(){
    console.log(this.companyForm.value.username);
    this.admin.body.password =this.companyForm.value.password;
    this.admin.body.username = this.companyForm.value.username;
    
    if(this.admin.message){
      this.admin.loginFunc().subscribe(
        res=>{
          
          if(res.message === "login successful"){
           this.router.navigate([this.admin.redirectURL]);
           localStorage.setItem('token',res.user.authToken);
           this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
          }else{
           this.openSnackBar("Wrong Username or Password");
          }
        },
        err=>{
         
          console.log(err);
        }
      );
    }else{
      this.admin.loginFunc().subscribe(
        res=>{
          
          if(res.message === "login successful"){
           this.router.navigate(['/mynav/dashb']);
           localStorage.setItem('token',res.user.authToken);
           this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
          }else{
           this.openSnackBar("Wrong Username or Password");
          }
        },
        err=>{
         
          console.log(err);
        }
      );
    }
     
  }
  companyForm:FormGroup;

  createForm(){
    this.companyForm = this.fb.group({
      username: ['',Validators.required],
      password:['',Validators.required],
      
    });
  }

  get username(){ return this.companyForm.get('username');}

  get password(){ return this.companyForm.get('password');}

  validateForm() {
    if (this.companyForm.invalid) {
      this.companyForm.get('password').markAsTouched();
      this.companyForm.get('username').markAsTouched();
      this.openSnackBar("Missing Username or Password");
    }else{
      this.nav();
    }
  }
  openSnackBar(message:string){
    this.snackBar.open(message,"Dismiss",{
      duration:2000,
    });
  }
}
