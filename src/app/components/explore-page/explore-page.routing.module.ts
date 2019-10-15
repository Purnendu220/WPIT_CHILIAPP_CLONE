import { ExplorePageComponent } from './explore-page.component';
import { Routes, RouterModule } from '@angular/router';

const routesExplorePage: Routes = [
    {
        path: '',
        component: ExplorePageComponent
    }
];
export const RoutingExplorePage = RouterModule.forChild(routesExplorePage);
