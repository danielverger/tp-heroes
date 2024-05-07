import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoaderComponent,
        ConfirmDialogComponent
  ],
    exports: [
        MaterialModule,
        CommonModule,
        ReactiveFormsModule
    ],
})
export class SharedModule {
}
