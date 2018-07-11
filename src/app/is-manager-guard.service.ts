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
export class IsManagerGuardService implements CanActivate{

  constructor(public admin:AdminService,public router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let url = state.url;
    return this.checkIfManager(url);
  }

  retval:boolean;

  checkIfManager(url:string):boolean{
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCurrUserFunc().subscribe(
        res=>{
          if(res.user.position.typeName == 'manager' || res.user.position.typeName == 'admin'){
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
