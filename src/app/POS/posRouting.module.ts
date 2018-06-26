import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { UpdateProdComponent } from './update-prod/update-prod.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProdComponent } from './view-prod/view-prod.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewTransComponent } from './view-trans/view-trans.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AddTransComponent } from './add-trans/add-trans.component';


const appRoutes:Routes = [
    {path:'mynav',component:MyNavComponent,children:[
        {path:'dashb',component:DashboardComponent,data:{state:'dashb'}},
        {path:'addTrans',component:AddTransComponent,data:{state:'addTrans'}},
        {path:'addProd',component:AddProductComponent,data:{state:'addProd'}},
        {path:'updateProd',component:UpdateProdComponent},
        {path:'viewProd',component:ViewProdComponent,data:{state:'viewProd'}},
        {path:'viewTrans',component:ViewTransComponent,data:{state:'viewTrans'}}
        ]
    }
]

 
@NgModule({
    imports: [     
      RouterModule.forChild(
        appRoutes
      )
    ],
    exports: [
      RouterModule,
    ],
    declarations:[
    ],
    entryComponents:[
      UpdateTransactionComponent,
      DeleteProductComponent,
      DeleteTransactionComponent
    ]
  })
  export class PosRoutingModule {}