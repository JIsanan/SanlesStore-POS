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
import { ViewUserTypeComponent } from './view-user-type/view-user-type.component';
import { AddUserTypeComponent } from './add-user-type/add-user-type.component';
import { IsManagerGuardService } from '../is-manager-guard.service';
import { IsEmployeeGuardService } from '../is-employee-guard.service';
import { ArchiveProdComponent } from './archive-prod/archive-prod.component';

const appRoutes:Routes = [
    {path:'mynav',component:MyNavComponent,children:[
        {path:'dashb',component:DashboardComponent,canActivate:[IsEmployeeGuardService],data:{state:'dashb'}},
        {path:'addTrans',component:AddTransComponent,data:{state:'addTrans'}},
        {path:'addProd',component:AddProductComponent,canActivate:[IsManagerGuardService],data:{state:'addProd'}},
        {path:'addUser',component:AddUsersComponent,canActivate:[AuthGuardService],data:{state:'addUser'}},
        {path:'updateProd',component:UpdateProdComponent},
        {path:'viewProd',component:ViewProdComponent,data:{state:'viewProd'}},
        {path:'viewTrans',component:ViewTransComponent,data:{state:'viewTrans'}},
        {path:'addProdType',component:AddProductTypeComponent,canActivate:[IsManagerGuardService],data:{state:'addProdType'}},
        {path:'viewProdtype',component:ViewProdtypeComponent,data:{state:'viewProdType'}},
        {path:'viewUsers',component:ViewUsersComponent,canActivate:[AuthGuardService],data:{state:'viewUsers'}},
        {path:'viewUserType',component:ViewUserTypeComponent,canActivate:[AuthGuardService],data:{state:'viewUserType'}},
        {path:'addUserType',component:AddUserTypeComponent,canActivate:[AuthGuardService],data:{state:'addUserType'}},
        {path:'archiveProd',component:ArchiveProdComponent,data:{state:'archiveProd'}}
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