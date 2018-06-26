import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DeleteProductComponent } from './POS/delete-product/delete-product.component';
import { UpdateTransactionComponent } from './POS/update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from './POS/delete-transaction/delete-transaction.component';


const appRoutes:Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
]

 
@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes
      )
    ],
    exports: [
      RouterModule
    ],
    entryComponents:[DeleteProductComponent,DeleteTransactionComponent,UpdateTransactionComponent]
  })
  export class AppRoutingModule {}