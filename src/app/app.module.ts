import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocomplete } from '@angular/material';
import { AddTransComponent } from './add-trans/add-trans.component';

import { UpdateProdComponent } from './update-prod/update-prod.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProdComponent } from './view-prod/view-prod.component';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewTransComponent } from './view-trans/view-trans.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


const appRoutes:Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'dashb',component:DashboardComponent},
    {path:'addTrans',component:AddTransComponent},
    {path:'addProd',component:AddProductComponent},
    {path:'updateProd',component:UpdateProdComponent},
    {path:'viewProd',component:ViewProdComponent},
    {path:'viewTrans',component:ViewTransComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    AddTransComponent,
    UpdateProdComponent,
    DashboardComponent,
    ViewProdComponent,
    AddProductComponent,
    ViewTransComponent,
    DeleteProductComponent,
    UpdateTransactionComponent,
    DeleteTransactionComponent,
    LoginComponent,
  
  ],
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DeleteProductComponent,DeleteTransactionComponent,UpdateTransactionComponent]
})
export class AppModule { }
