import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from './loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialogRef!: MatDialogRef<LoaderComponent>;

  constructor(public dialog: MatDialog) { }

  showLoading() {
    this.dialogRef = this.dialog.open(LoaderComponent, { disableClose: true, panelClass: "loader-dialog" });
  }

  closeLoading() {
    this.dialogRef.close();
  }

}
