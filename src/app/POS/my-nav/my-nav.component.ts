import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
  animations: [
    trigger('routerTransition',[
      transition("*<=>*",[
        query(':enter,:leave',style({position:'fixed',width:'100%'}),{optional:true}),
        group([
          query(":enter",[
             style({transform:'translateX(100%)'}),
             animate('0.5s ease-in',style({transform:'translateX(0%)'}))
          ],{optional:true}),
          query(':leave',[
            style({transform:'translateX(0%)'}),
            animate('0.5s ease-in-out',style({transform:'translateX(100%)'}))
          ],{optional:true}),
        ])
      ])
    ]),
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#FFFFFF',
        transform: 'scale(1)'
      })),
      state('active',   style({
        color:'#FFFFFF',
        backgroundColor: '#006064',
        transform: 'scale(1.1)'
        
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class MyNavComponent {

  public linkBatch:links[];

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver) {
    this.linkBatch = [
      new links("/mynav/dashb","Dashboard",'inactive'),
      new links("/mynav/addTrans","Add New Transaction",'inactive'),
      new links("/mynav/addProd","Add New Product",'inactive'),
      new links('/mynav/addUser','Add New User','inactive'),
      new links("/mynav/addProdType","Add New Product Type",'inactive'),
      new links("/mynav/viewProd","View Products",'inactive'),
      new links("/mynav/viewTrans","View Transactions",'inactive'),
      new links('/mynav/viewProdtype',"View Product Types",'inactive'),
      new links('/mynav/viewUsers',"View Users",'inactive')
    ]
  }
  
  getState(outlet){
    console.log(outlet.activatedRouteData.state);
    return outlet.activatedRouteData.state;
  }
  
  
  }

  export class links{
         constructor(public route:String,public linkName:String,public state:String){}

         toggleState():void{
          this.state = this.state === 'active' ? 'inactive' : 'active';
         }
  }