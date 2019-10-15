import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';

const routesSettings: Routes = [
    {
        path: '',
        component: SettingsComponent,
     data: {
        title: 'User Settings'
      }
    }
    ,
  {
    path: ":query",
    component: SettingsComponent,
     data: {
        title: 'User Settings'
      }
  }
];
export const RoutingSettings = RouterModule.forChild(routesSettings);
