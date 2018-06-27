import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

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
    
  constructor(public router:Router ,public admin:AdminService) { }

  ngOnInit() {
  }

  nav(){
     this.router.navigate(['/mynav/dashb']);
     this.admin.postFunc().subscribe(
       res=>{
         console.log(res[0].addedDate);
       }
     );
  }
}
