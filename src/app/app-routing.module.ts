import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { BillingPageComponent } from './billing-page/billing-page.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { TablesComponent } from "./pages/tables/tables.component";
import { ManageItemComponent } from "./pages/manage-item/manage-item.component";
import { CategoryComponent } from './category/category.component';
const routes: Routes = [
  {
    path:'',
    component: DashboardLayoutComponent,
    children : [
      {
        path : '',
        component:TablesComponent
      },
      {
        path : 'ManageItem',
        component : ManageItemComponent
      },
      {
        path:'Category',
        component: CategoryComponent
      }
    ]
  },
  {
    path:'billing/:table',
    component: BillingPageComponent,
  },
  {
    path:'invoice/:name/:phone/:address/:table',
    component: InvoiceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
