import { NgModule } from '@angular/core';

import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroModifyComponent } from './hero-modify/hero-modify.component';


@NgModule({
  declarations: [
    HeroesListComponent,
    HeroModifyComponent
  ],
  imports: [
    SharedModule,
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
