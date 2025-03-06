import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ManageCategoryService } from '../../services/manage-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../pages/create-category/create-category.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryComponent } from '../../pages/update-category/update-category.component';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
}

interface Category {
  category: string;
  items: Item[];
}                                                                                                                

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.css']
})
export class ManageItemComponent implements OnInit{


  categories: Category[] = [
    {
      category: 'fruit',
      items: [
        { id: 1, name: 'banana', description: 'banana is fruit', price: 50, discount: 5 },
        { id: 2, name: 'apple', description: 'apple is fruit', price: 100, discount: 10 },
        
      ]
    },
    {
      category: 'vegetable',
      items: [
        { id: 3, name: 'potato', description: 'potato is vegetable', price: 25, discount: 0 },
        { id: 4, name: 'tomato', description: 'tomato is vegetable', price: 50, discount: 4 }
      ]
    }
  ];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
