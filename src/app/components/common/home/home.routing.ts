import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';

const routesHome: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'aboutapp',
    component: HomeComponent
  },
  {
    path:'testimonial',
    component: HomeComponent
  },{
    path:'contactus',
    component: HomeComponent
  }
];

export const routingHome = RouterModule.forChild(routesHome);
