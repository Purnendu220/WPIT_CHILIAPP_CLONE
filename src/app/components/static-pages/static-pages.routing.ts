import { StaticPagesComponent } from './static-pages.component';
import { Routes, RouterModule } from '@angular/router';

const routesStaticPages: Routes = [  
  {
    path:'',
    component: StaticPagesComponent
  } 
];

export const RoutingStaticPages = RouterModule.forChild(routesStaticPages);
