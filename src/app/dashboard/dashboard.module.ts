import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidenavComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    RouterModule
  ]
})
export class DashboardModule { }
