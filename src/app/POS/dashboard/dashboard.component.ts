import { Component,OnInit} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminService } from '../../admin.service';
import { CountoModule }  from 'angular2-counto';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  content;
  endVal = '5000';

  cards = [
    { title: 'Monthly Revenue this Year', cols: 2, rows: 1 },
    
  ];

  cards2 = [
   
    { title: 'Card 2', cols: 1, rows: 1 },
   
  ];

  cards3 = [
   
    { title: 'Card 3', cols: 1, rows: 2 },
    
  ];

  cards4 = [
   
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  output;

  single:any[]=[
    {
      'name':'January',
      'value':0
    },
    {
      'name':'February',
      'value':0
    },
    {
      'name':'March',
      'value':0
    },
    {
      'name':'April',
      'value':0
    },
    {
      'name':'May',
      'value':0
    },
    {
      'name':'June',
      'value':0
    },
    {
      'name':'July',
      'value':0
    },
    {
      'name':'August',
      'value':0
    },
    {
      'name':'September',
      'value':0
    },
    {
      'name':'October',
      'value':0
    },
    {
      'name':'November',
      'value':0
    },
    {
      'name':'December',
      'value':0
    }

  ];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Months';
  showYAxisLabel = true;
  yAxisLabel = 'Revenue';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(public admin:AdminService){
    
  }
  ngOnInit(){
    
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));   
    
    }
      this.admin.getYearlyFunc().subscribe(
        res=>{
          // let single:any[];
          console.log(res);
          let i;
          for(i=0;i<12;i++){
            this.single[i].value=res.data[i];
            console.log(this.single);
            // single = this.single;
            // Object.assign(this,{single});
            this.content=true;
          }
          this.output = this.single;
        }
      );
  }
}
