import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocomplete } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { IsEmployeeGuardService } from '../is-employee-guard.service';

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