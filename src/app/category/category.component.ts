import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ManageCategoryService } from '../services/manage-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../pages/create-category/create-category.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryComponent } from '../pages/update-category/update-category.component';

export interface PeriodicElement {
  name: string;
  id: number;
  description: number;
  action: string;
}
export interface categoryStructure {
  id: number;
  name: string;
  description: string;
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
      data: { name: this.name, description: this.description },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // If no result is returned from the dialog, simply return.
      if (!result) {
        return;
      }
  
      // Call createCategory and handle the promise response.
      this.CategoryService.createCategory(result)
        .then((response: any) => {
          // Check if response is an array with at least one element.
          if (response && Array.isArray(response) && response.length > 0) {
            const newCategory: categoryStructure = response[0];
            // Push the newly created category into your FilterCateogories array.
            this.FilterCateogories = [...this.FilterCateogories, newCategory];
            this._snack.open(`${newCategory.name} Category created Successfully`, '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          } else {
            // In case the response format is unexpected or empty.
            this._snack.open(`${this.name} Category was not created`, '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        })
        .catch((error) => {
          console.error('Error creating category:', error);
          this._snack.open(`${this.name} Category creation failed`, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        });
    });
  }

  updateCategory(category : any){
    const dialogRef = this._dialog.open(UpdateCategoryComponent, {
       data: { name: category.name, description: category.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // If no result is returned from the dialog, simply return.
      if (!result) {
        return;
      }

      let data = {id : category.id , name : result.name , description : result.description};
      // Call createCategory and handle the promise response.
      this.CategoryService.updateCategory(data)
        .then((response: any) => {
          // Check if response is an array with at least one element.
          if (response && Array.isArray(response) && response.length > 0) {
            const newCategory: categoryStructure = response[0];
            
            this.FilterCateogories = this.FilterCateogories.map(record =>
              record.id === response[0].id ? newCategory : record
            );
            
            console.log(this.FilterCateogories);
            this._snack.open(`${newCategory.name} Category Updated Successfully`, '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          } else {
            // In case the response format is unexpected or empty.
            this._snack.open(`${this.name} Category not Updated`, '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        })
        .catch((error) => {
          console.error('Error creating category:', error);
          this._snack.open(`${this.name} Category creation failed`, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        });
    });

  }


  // CreateCategory() {

  //   const dialogRef = this._dialog.open(CreateCategoryComponent, {
  //           data: { name: this.name, description: this.description },
  //         });
  //     dialogRef.afterClosed().subscribe((result) => {
  //         console.log(result);
  //         this.Response = null;
  //         this.Response = this.CategoryService.createCategory(result);

  //         if (this.Response === null){
  //           this._snack.open(name + " Category is was not created", '', {
  //             duration: 3000,
  //             horizontalPosition: 'center',
  //             verticalPosition: 'bottom',
  //           });
  //         }else{
  //           this._snack.open(name + " Category created Successfully", '', {
  //             duration: 3000,
  //             horizontalPosition: 'center',
  //             verticalPosition: 'bottom',
  //           });
  //           // window.location.reload();
  //         }
  //     });

  // }


}




