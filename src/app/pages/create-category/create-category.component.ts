import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  name : string;
  description: string;
}

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  constructor(private route: Router, public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private renderer: Renderer2, private _snack: MatSnackBar) {
  }
  submit(): void {
    // Validate input fields
    if (!this.data.name || !this.data.description) {
      // Optionally, display an error message to the user
      this._snack.open(name + " Please enter name and description", '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }
    
    // Close the dialog and pass data back
    this.dialogRef.close(this.data);
  }
}
