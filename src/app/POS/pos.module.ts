import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { PosComponent } from './pos.component';
import { NgModule }              from '@angular/core';
import { UpdateProdComponent } from './update-prod/update-prod.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProdComponent } from './view-prod/view-prod.component';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewTransComponent } from './view-trans/view-trans.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocomplete } from '@angular/material';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AddTransComponent } from './add-trans/add-trans.component';
import { FormsModule } from '@angular/forms';
import { PosRoutingModule } from './posRouting.module';

@NgModule({
    imports: [
      PosRoutingModule,
      MatSelectModule,
      CommonModule,
      CommonModule,
      FormsModule,
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
      
    ],
    declarations: [
      PosComponent,
      MyNavComponent,
      UpdateTransactionComponent,
      DashboardComponent,
      AddTransComponent,
      AddProductComponent,
      AddProductComponent,
      UpdateProdComponent,
      ViewProdComponent,
      ViewTransComponent,
      DeleteProductComponent,
      DeleteTransactionComponent
    ],
    providers: [
      
    ],
    entryComponents:[
      UpdateTransactionComponent,
      DeleteProductComponent,
      DeleteTransactionComponent
    ]
  })
  export class POSModule {}