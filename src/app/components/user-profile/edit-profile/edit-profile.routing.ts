import { EditProfileComponent } from './edit-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routesEditprofile: Routes = [  
  {
    path:'',
    component: EditProfileComponent
  },
  {
    path: ":query",
    component: EditProfileComponent,
     data: {
        title: 'User Profile'
      }
  }
];

export const RoutingEditrofile = RouterModule.forChild(routesEditprofile);
