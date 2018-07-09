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
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { ViewProdtypeComponent } from './view-prodtype/view-prodtype.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { AuthGuardService } from '../auth-guard.service';

const appRoutes:Routes = [
    {path:'mynav',component:MyNavComponent,children:[
        {path:'dashb',component:DashboardComponent,data:{state:'dashb'}},
        {path:'addTrans',component:AddTransComponent,data:{state:'addTrans'}},
        {path:'addProd',component:AddProductComponent,data:{state:'addProd'}},
        {path:'addUser',component:AddUsersComponent,data:{state:'addUser'}},
        {path:'updateProd',component:UpdateProdComponent},
        {path:'viewProd',component:ViewProdComponent,data:{state:'viewProd'}},
        {path:'viewTrans',component:ViewTransComponent,data:{state:'viewTrans'}},
        {path:'addProdType',component:AddProductTypeComponent,data:{state:'addProdType'}},
        {path:'viewProdtype',component:ViewProdtypeComponent,data:{state:'viewProdType'}},
        {path:'viewUsers',component:ViewUsersComponent,canActivate:[AuthGuardService],data:{state:'viewUsers'}}
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