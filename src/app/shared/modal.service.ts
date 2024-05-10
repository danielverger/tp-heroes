import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

export type snackBarType = 'warning' | 'error' | 'info'
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public dialogRef!: MatDialogRef<LoaderComponent>|null;

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){ }

  showLoading() {
    if ( !this.dialogRef ) {
      this.dialogRef = this.dialog.open( LoaderComponent, { disableClose: true, panelClass: "loader-dialog" } );
    }
  }

  closeLoading() {
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  confirmDialog(title: string, message: string): MatDialogRef<ConfirmDialogComponent> {
      return this.dialog.open( ConfirmDialogComponent, {
        width: '350px',
        data: <ConfirmDialogData>{ title, message }
      });
  }

  openSnackBar(message: string, type: snackBarType) {
    const config = new MatSnackBarConfig;
    config.duration = type === 'error' ? 2000 : 1200;
    config.panelClass = `${type}-snackbar`;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    return this.snackBar.open( message, '', config );
  }
  
}
