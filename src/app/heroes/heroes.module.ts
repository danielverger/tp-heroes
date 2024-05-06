import { NgModule } from '@angular/core';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeroesComponent
  ],
  imports: [
    SharedModule,
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
