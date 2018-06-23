import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
  animations: [
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
      new links("/addTrans","Add New Transaction",'inactive'),
      new links("/addProd","Add Product",'inactive'),
      new links("/viewProd","View Products",'inactive'),
      new links("/viewTrans","View Transactions",'inactive')
    ]
  }
  
  
  
  }

  export class links{
         constructor(public route:String,public linkName:String,public state:String){}

         toggleState():void{
          this.state = this.state === 'active' ? 'inactive' : 'active';
         }
  }