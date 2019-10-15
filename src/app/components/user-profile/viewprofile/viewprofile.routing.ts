import { ViewprofileComponent } from './viewprofile.component';
import { Routes, RouterModule } from '@angular/router';

const routesViewprofile: Routes = [
  {
    path:':id',
    component: ViewprofileComponent
  },
  {
    path:':id/:code',
    component: ViewprofileComponent
  }
];

export const RoutingViewprofile = RouterModule.forChild(routesViewprofile);
