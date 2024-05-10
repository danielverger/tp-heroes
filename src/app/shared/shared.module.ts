import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpperCaseDirective } from './upper-case.directive';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoaderComponent,
        ConfirmDialogComponent,
        UpperCaseDirective
  ],
    exports: [
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        UpperCaseDirective
    ],
})
export class SharedModule {
}
