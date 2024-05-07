import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        LoaderComponent
  ],
    exports: [
        MaterialModule,
        CommonModule
    ],
})
export class SharedModule {
}
