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
import { MatProgressSpinnerModule,MatAutocompleteModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocomplete } from '@angular/material';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AddTransComponent } from './add-trans/add-trans.component';
import { FormsModule } from '@angular/forms';
import { PosRoutingModule } from './posRouting.module';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { ViewProdtypeComponent } from './view-prodtype/view-prodtype.component';
import { DeleteProductTypeComponent } from './delete-product-type/delete-product-type.component';
import { UpdateProductTypeComponent } from './update-product-type/update-product-type.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CountUpModule } from 'countup.js-angular2';
import { CountoModule }  from 'angular2-counto';
import { ViewUserTypeComponent } from './view-user-type/view-user-type.component';
import { UpdateUserTypeComponent } from './update-user-type/update-user-type.component';
import { DeleteUserTypeComponent } from './delete-user-type/delete-user-type.component';
import { AddUserTypeComponent } from './add-user-type/add-user-type.component';
import { ProdDetailsComponent } from './prod-details/prod-details.component';
import { ProdTypeDetailsComponent } from './prod-type-details/prod-type-details.component';
import { TransDetailsComponent } from './trans-details/trans-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ArchiveProdComponent } from './archive-prod/archive-prod.component';
import { ArchiveUsersComponent } from './archive-users/archive-users.component';
import { ArchiveProdTypeComponent } from './archive-prod-type/archive-prod-type.component';
import { ArchiveTransComponent } from './archive-trans/archive-trans.component';
import { ArchiveUserTypeComponent } from './archive-user-type/archive-user-type.component';
import { UserTypeDetailsComponent } from './user-type-details/user-type-details.component';


@NgModule({
    imports: [
      
      CountoModule,
      CountUpModule,
      NgxChartsModule,
      MatProgressSpinnerModule,
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
      UserTypeDetailsComponent,
      ArchiveUserTypeComponent,
      ArchiveTransComponent,
      ArchiveProdTypeComponent,
      ArchiveUsersComponent,
      ArchiveProdComponent,
      UserDetailsComponent,
      TransDetailsComponent,
      ProdTypeDetailsComponent,
      ProdDetailsComponent,
      AddUserTypeComponent,
      UpdateUserTypeComponent,
      DeleteUserTypeComponent,
      ViewUserTypeComponent,
      UpdateUserComponent,
      DeleteUserComponent,
      AddUsersComponent,
      ViewUsersComponent,
      UpdateProductTypeComponent,    
      DeleteProductTypeComponent,
      ViewProdtypeComponent,
      PosComponent,
      MyNavComponent,
      UpdateTransactionComponent,
      DashboardComponent,
      AddTransComponent,
      AddProductComponent,
      UpdateProdComponent,
      ViewProdComponent,
      ViewTransComponent,
      DeleteProductComponent,
      DeleteTransactionComponent,
      AddProductTypeComponent
    ],
    providers: [
      
    ],
    entryComponents:[
      UserTypeDetailsComponent,
      UserDetailsComponent,
      TransDetailsComponent,
      ProdTypeDetailsComponent,
      ProdDetailsComponent,
      UpdateUserTypeComponent,
      DeleteUserTypeComponent,
      UpdateUserComponent,
      UpdateProductTypeComponent,
      DeleteProductTypeComponent,
      UpdateTransactionComponent,
      DeleteProductComponent,
      DeleteTransactionComponent,
      DeleteUserComponent
    ]
  })
  export class POSModule {}