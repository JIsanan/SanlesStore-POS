import { Component,OnInit} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminService } from '../../admin.service';
import { CountoModule }  from 'angular2-counto';
import { monthStruc } from './monthStruc';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  content;
  endVal = '5000';
  currRev:number;
  hasContent;
  monthRev:monthStruc[]=[
    {
      "name":'1',
      "value":0
    },
    {
      "name":'2',
      "value":0
    },
    {
      "name":'3',
      "value":0
    },
    {
      "name":'4',
      "value":0
    },
    {
      "name":'5',
      "value":0
    },
    {
      "name":'6',
      "value":0
    },
    {
      "name":'7',
      "value":0
    },
    {
      "name":'8',
      "value":0
    },
    {
      "name":'9',
      "value":0
    },
    {
      "name":'10',
      "value":0
    },
    {
      "name":'11',
      "value":0
    },
    {
      "name":'12',
      "value":0
    },
    {
      "name":'13',
      "value":0
    },
    {
      "name":'14',
      "value":0
    },
    {
      "name":'15',
      "value":0
    },
    {
      "name":'16',
      "value":0
    },
    {
      "name":'17',
      "value":0
    },
    {
      "name":'18',
      "value":0
    },
    {
      "name":'19',
      "value":0
    },
    {
      "name":'20',
      "value":0
    },
    {
      "name":'21',
      "value":0
    },
    {
      "name":'22',
      "value":0
    },
    {
      "name":'23',
      "value":0
    },
    {
      "name":'24',
      "value":0
    },
    {
      "name":'25',
      "value":0
    },
    {
      "name":'26',
      "value":0
    },
    {
      "name":'27',
      "value":0
    },
    {
      "name":'28',
      "value":0
    },
    {
      "name":'29',
      "value":0
    },
    {
      "name":'30',
      "value":0
    }
    

    
  ];

  cards = [
    { title: 'Monthly Revenue this Year', cols: 2, rows: 1.2 },
    
  ];

  cards2 = [
   
    { title: 'Revenue Today', cols: 1, rows: 1 },
   
  ];

  cards3 = [
   
    { title: 'Revenue within the last 30 Days', cols: 1, rows: 2 },
    
  ];

  cards4 = [
   
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  output;

  days:string[]=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
  months:string[]=['January','February','March','April','May','June','July','August','September','October','November','December'];
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

  temp:monthStruc={
    'value':0,
    'name':"0"
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Months';
  showYAxisLabel = true;
  yAxisLabel = 'Revenue';
  date;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  barview=[650,500];
  constructor(public admin:AdminService){
    this.date = new Date();
    this.setResults();
    // this.setDailyResults();
    console.log("HELLO");
    console.log(this.date.getDate());
  }
  ngOnInit(){
    
    if(localStorage.getItem('token')){
      this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));   
      this.admin.getYearlyFunc().subscribe(
        res=>{
          // let single:any[];
          console.log(res);
          let i,x;
          console.log(res.data.length);
          for(i=0,x = 11; x >=0 ;i++,x--){
            // console.log(res.data[i]);
            this.single[i].value=res.data[x];
            // console.log(this.single[i]);
            // single = this.single;
            // Object.assign(this,{single});
            this.content=true;
          }
          this.output = this.single;
        }
      );
      this.admin.getTodayFunc().subscribe(
        res=>{
          this.currRev = res.data;
        }
      );
      this.admin.getMonthSaleFunc().subscribe(
        res=>{
          console.log(res);
          for(let i=29,x=0;x<30;i--,x++){
            
            // this.temp.value = res.data[i];
            // this.temp.name = i.toString();
            // // console.log(this.temp);
            // this.monthRev.push(this.temp);
            this.monthRev[x].value = res.data[i];
            // console.log(this.monthRev[i].value);
          }
          console.log(this.monthRev);
          this.hasContent = this.monthRev;
        }
      );
    }
      
  }

  setResults(){
    let i = this.date.getMonth();
    for(let x=11;x>=0;x--,i=(i-1+12)%12){
      this.single[x].name = this.months[i]
      // this.single[x].name = this.months[i];
      // console.log(this.single[x].name);
      console.log(this.months[i]);
    }
    console.log(this.single);
  }

  // setDailyResults(){
  //   let i = this.date.getDate()-1;
  //   for(let x=29;x>=0;x--,i=(i-1+30)%30){
  //     this.monthRev[x].name = this.days[i];
  //   }
  //   // console.log(this.monthRev);
  // }
}
