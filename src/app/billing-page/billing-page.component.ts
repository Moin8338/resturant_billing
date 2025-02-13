import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FoodItemService } from '../services/food-item.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerDetailComponent } from '../pages/customer-detail/customer-detail.component';
import { InvoiceComponent } from '../pages/invoice/invoice.component';



@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css', './billing-page.component.scss']
})
export class BillingPageComponent implements OnInit {



  @ViewChild('customer-invoice', { static: false }) printableSection!: ElementRef;

  constructor(private route: ActivatedRoute,private _route:Router, private _snack: MatSnackBar, private itemService: FoodItemService, public _dialog: MatDialog) { }

  categories!: Array<any>;
  orderList: Array<Order> = [];
  categoryItems!: Array<any>;
  ItemsOnCategory!: any;
  searchKeyByCategory!: any;
  searchKeyByItemName!: any;
  categoryName!: any; 
  
  table: any;
  cName!: any;
  cAddress!: any;
  cPhoneNo!: any;
  show = true;


  async ngOnInit() : Promise<void> {
    this.categories = await this.itemService.getAllItem();
    this.categoryItems = this.categories[0].items;
    this.ItemsOnCategory = this.categories[0].items;
    this.categoryName = this.categories[0].name;
    this.route.params.subscribe(parameter => {
      this.table = parameter['table'];
    });
    if (localStorage.getItem(this.table)) {
      this.orderList = JSON.parse(localStorage.getItem(this.table) || '{}');
    }
  }



  ShowItemByCategory(categoryId: any) {
    this.categoryItems = this.itemService.getItemByCategory(categoryId);
    this.searchKeyByCategory = this.categories[categoryId - 1].name;
    this.categoryName = this.categories[categoryId - 1].name;
    this.ItemsOnCategory = this.categoryItems;
  }

  filterItemByCategory() {

    this.ItemsOnCategory = this.categoryItems;

    this.categoryItems = [];
    if (this.searchKeyByCategory == null) {
      this.categoryItems = this.categories[0].items;

    }
    this.categories.forEach(c => {
      if (c.name.startsWith(this.searchKeyByCategory)) {
        this.categoryName = c.name;
        this.categoryItems = c.items;
      }
    });
  }

  filterItemByName() {
    this.categoryItems =[];
    this.categoryName = 'General Search';
    if (this.searchKeyByItemName == null || this.searchKeyByItemName == "") {
      this.categoryItems = this.ItemsOnCategory;
    } else {
      this.categories.forEach((c: any) => {
        c.items.forEach((item: any) => {
          if (item.name.toLowerCase().includes(this.searchKeyByItemName.toLowerCase())) {
            this.categoryItems.push(item);
          }
        });
      });
    }



  }


  addInOrderTable(item: any) {
    let flag = 0;
    let o = new Order(item.id, item.name, item.price, 1);
    if (this.orderList.length != 0) {

      this.orderList.forEach((order: any) => {
        if (flag != 1) {
          if (order.id == item.id) {
            flag = 1;
            order.qty++;
          }
          else {
            flag = 0;
          }
        }
      });
      if (flag == 0) {
        this.orderList.push(o);
      }
    }
    else {
      this.orderList.push(o);
    }
    // console.log(JSON.stringify(item));
    this._snack.open(item.name + " Added to Order List", '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  decQty(itemid: any) {
    let i = 0;
    this.orderList.forEach((order: any) => {
      if (order.id == itemid) {
        if (order.qty == 1) {
          this.orderList.splice(this.orderList.indexOf(order), 1);
          this._snack.open(order.name + " is Removed from Order", "", {
            duration: 3500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
        else {
          order.qty = order.qty - 1;
        }
      }
    });
  }

  incQty(itemid: any) {
    this.orderList.forEach((order: any) => {
      if (order.id == itemid) {
        order.qty = order.qty + 1;
      }
    });
  }


  DataOnHold() {
    localStorage.setItem(this.table, JSON.stringify(this.orderList));
    // this._snack.open("Order On Table " + this.table + " is On Hold", "", {
    //   duration: 2000
    // });
  }


  printInvoice() {
    if (this.orderList.length != 0) {
      const dialogRef = this._dialog.open(CustomerDetailComponent, {
        data: { name: this.cName, phone: this.cPhoneNo, address: this.cAddress },
      });
      dialogRef.afterClosed().subscribe((result) => {

        this.cName = result.name;
        this.cPhoneNo = result.phone;
        this.cAddress = result.address;
        console.log(this.cName);
        // const printContents = document.getElementById("customer-invoice")!.innerHTML;
        // const originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // this.show = !this.show;
        this.DataOnHold();
        this._route.navigate(["invoice/"+this.cName+"/"+this.cPhoneNo+"/"+this.cAddress+"/"+this.table]);


        // if (!this.show) {
          
        // }
        // document.body.innerHTML = originalContents;
        // window.location.reload();
        // this.show = !this.show;
      });

    }
    else {
      this._snack.open("Please Enter Order Item", "", {
        duration: 2000
      });
    }
  }






}







class Order {
  id;
  name;
  price;
  qty;
  total;

  constructor(id: any, name: any, price: any, qty: any) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.total = qty * price;
  }
}