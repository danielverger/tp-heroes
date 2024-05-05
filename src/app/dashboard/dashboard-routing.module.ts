import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";


export const dashboardRoutes: Routes = [
  {path: '', component: DashboardComponent,
    children: [{
    path: 'heroes',
    loadChildren: () =>
      import('../heroes/heroes.module').then(
        m => m.HeroesModule
      ),
    }],
}]


@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
