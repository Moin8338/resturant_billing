import { Component, HostListener, OnInit } from '@angular/core';
import { TableServiceService } from '../../services/table-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit{
tables!: any;
  filtredTables!: Array<any>;

  constructor(private tableList: TableServiceService, private _snack: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.tables = JSON.parse(this.tableList.getAllTables() || '{}');
    this.filtredTables = this.tables;
  }

  shortByStatus(Status: any) {
    if (Status.target.value == 'All') {
      this.filtredTables = this.tables;
    }
    else {
      this.filtredTables = [];
      this.tables.forEach((table: any) => {
        if (table.status == Status.target.value) {
          this.filtredTables.push(table);
        }
      });
    }
  }

  addTable() {
    this.tables = this.tableList.addTable({ "id": this.tables.length + 1, "desc": "this is tenth table", "status": "Blank", "color": "gray","enable":true });
    this.filtredTables = this.tables;
    this._snack.open("Table Added SuccessFully", "", {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }

  contextMenu!: any;

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {

  }
}
