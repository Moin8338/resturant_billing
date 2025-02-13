import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ManageCategoryService } from '../services/manage-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../pages/create-category/create-category.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  id: number;
  description: number;
  action: string;
}


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories !: Array<any>;
  FilterCateogories!: Array<any>;
  Response !: any;
  categoryFilterValue!: String;
  cPhoneNo: any;
  name: any;
  description: any;
  constructor(private CategoryService : ManageCategoryService,private _snack: MatSnackBar, public _dialog: MatDialog,private _route:Router){}
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'Action'];

  async ngOnInit() : Promise<void> {
    this.categories = await this.CategoryService.getCategories();
    this.FilterCateogories = this.categories;
  }

  async deleteCategory(id : number,name: string) : Promise<void>{
        this.Response = await this.CategoryService.deleteCateory(id);
        console.log(this.Response);
        if (this.Response === 'Success') {
          this._snack.open(name + " Category is now Delete", '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        
        }
  }

  filterCategory(){
    this.FilterCateogories = [];
    this.categories.forEach(c => {
      if (c.name.toLowerCase().startsWith(this.categoryFilterValue.toLowerCase())) {
        this.FilterCateogories.push(c);
        // console.log(this.categoryFilterValue);
        
      }
    });
  }

  CreateCategory() {

    const dialogRef = this._dialog.open(CreateCategoryComponent, {
            data: { name: this.name, phone: this.cPhoneNo, address: this.description },
          });
    // if (this.orderList.length != 0) {
    //   const dialogRef = this._dialog.open(CustomerDetailComponent, {
    //     data: { name: this.cName, phone: this.cPhoneNo, address: this.cAddress },
    //   });
      dialogRef.afterClosed().subscribe((result) => {

        // this.cName = result.name;
        // this.cPhoneNo = result.phone;
        // this.cAddress = result.address;
        // console.log(this.cName);
    //     // const printContents = document.getElementById("customer-invoice")!.innerHTML;
    //     // const originalContents = document.body.innerHTML;
    //     // document.body.innerHTML = printContents;
    //     // this.show = !this.show;
    //     this.DataOnHold();
    //     this._route.navigate(["invoice/"+this.cName+"/"+this.cPhoneNo+"/"+this.cAddress+"/"+this.table]);
          // this._route.navigate([""]);

    //     // if (!this.show) {
          
    //     // }
    //     // document.body.innerHTML = originalContents;
    //     // window.location.reload();
    //     // this.show = !this.show;
      });

    // }
    // else {
    //   this._snack.open("Please Enter Order Item", "", {
    //     duration: 2000
    //   });
    // }



  }


}




