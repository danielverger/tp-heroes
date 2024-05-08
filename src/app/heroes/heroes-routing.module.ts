import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroModifyComponent } from './hero-modify/hero-modify.component';

const routes: Routes = [
  {path: '', component: HeroesListComponent},
  {path: 'add', component: HeroModifyComponent, data: {title: 'Add Hero'} },
  {path: ':id', component: HeroModifyComponent, data: {title: 'Modify Hero'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
