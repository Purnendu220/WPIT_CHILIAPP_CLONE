import { Routes, RouterModule } from '@angular/router';
import {TeacherComponent} from './teacher.component';

const routesteacherPage: Routes = [
  {
    path: '',
    component: TeacherComponent
  }
];

export const RoutingTeacherPage = RouterModule.forChild(routesteacherPage);
