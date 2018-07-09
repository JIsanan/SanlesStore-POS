import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule,MatAutocompleteModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocomplete } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LogInPageModule} from './LOGINPAGE/loginpage.module';
import { POSModule } from './POS/pos.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';
import { AuthService } from './interceptors/auth.service';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CountUpModule } from 'countup.js-angular2';
import { CountoModule } from 'angular2-counto';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CountoModule,
    CountUpModule,
    NgxChartsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    POSModule,
    LogInPageModule,
    AppRoutingModule,
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
  providers: [AdminService,AuthService],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }