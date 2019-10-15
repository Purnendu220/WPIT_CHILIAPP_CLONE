import { Routes, RouterModule } from '@angular/router';
import {SchoolComponent} from './school.component';

const routesschoolPage: Routes = [
  {
    path: '',
    component: SchoolComponent
  }
];

export const RoutingSchoolPage = RouterModule.forChild(routesschoolPage);
