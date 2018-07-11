import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class IsEmployeeGuardService implements CanActivate{

  constructor(public admin:AdminService,public router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let url = state.url;
    return this.checkIfEmployee(url);
  }

  retval:boolean=true;

  checkIfEmployee(url:string):boolean{

    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
      this.admin.getCurrUserFunc().subscribe(
        res=>{
          if(res.user.position.typeName == 'employee'){
            this.router.navigate(['/mynav/viewTrans']);
          }else{
            this.router.navigate(['/mynav/dashb']);
          }
        }
      );
    }
    return this.retval;
  }

}
