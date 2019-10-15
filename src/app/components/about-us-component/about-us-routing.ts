import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponentComponent } from './about-us-component.component';

const routesaboutPage: Routes = [
  {
    path: '',
    component: AboutUsComponentComponent
  }
];

export const RoutingAboutPage = RouterModule.forChild(routesaboutPage);
