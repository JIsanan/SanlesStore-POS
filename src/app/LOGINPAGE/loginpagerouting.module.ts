import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from '../my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocomplete } from '@angular/material';
import { AddTransComponent } from '../add-trans/add-trans.component';

import { UpdateProdComponent } from '../update-prod/update-prod.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewProdComponent } from '../view-prod/view-prod.component';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from '../add-product/add-product.component';
import { ViewTransComponent } from '../view-trans/view-trans.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { UpdateTransactionComponent } from '../update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from '../delete-transaction/delete-transaction.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const appRoutes:Routes = [
    {path:'login',component:LoginComponent}
]

 
@NgModule({
    imports: [
      MatAutocompleteModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatInputModule,
      FormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      LayoutModule,
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
      MatSelectModule,
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forChild(
        appRoutes
      )
    ],
    exports: [
      RouterModule
    ],
    declarations: [
      LoginComponent,
    ]
  })
  export class loginpageroutingModule {}