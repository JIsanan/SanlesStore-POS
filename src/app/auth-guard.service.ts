import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {
   Router,
  ActivatedRoute,
  RouterStateSnapshot
}                           from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("YOOOOO");
    let url = state.url;
    return this.checkLogin(url);
  }
  retval:boolean;
  message:string;
  constructor(public admin:AdminService,public router:Router) {
    
   }

  checkLogin(url:string):boolean{
       if(localStorage.getItem('token')){
        this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
        this.admin.getCurrUserFunc().subscribe(
          res=>{
            console.log(res);
            if(res.user.position.typeName == "admin"){
              console.log("TRUE");
              this.retval = true;
              this.router.navigate([url]);
            }else{
              console.log("FALSE");
              this.retval = false;
              this.admin.redirectURL = url;
              this.admin.message = 'Unauthorized access please login with credentials';
              this.router.navigate(['/login']);
            }
          }
        );
       }
       
       return this.retval;
  }
}
