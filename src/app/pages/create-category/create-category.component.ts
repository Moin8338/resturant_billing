import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';

export interface DialogData {
  id : number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  constructor(private route: Router, public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private renderer: Renderer2) {
  }
}
