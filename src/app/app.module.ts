import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { BillingPageComponent } from './billing-page/billing-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { ManageItemComponent } from './pages/manage-item/manage-item.component';
import { TablesComponent } from './pages/tables/tables.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CategoryComponent } from './category/category.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    BillingPageComponent,
    InvoiceComponent,
    CustomerDetailComponent,
    ManageItemComponent,
    TablesComponent,
    CategoryComponent,
    CreateCategoryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
