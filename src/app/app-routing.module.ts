import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-gaurd-module/auth-gaurd.service';
import { AuthGuardLoginCheckService } from './auth-gaurd-module/auth-gaurd-login-check.service';
import { UserAgentService } from './user-agent-module/user-agent.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/components/common/home/home.module#HomeModule',
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    data: {
      title: 'Home'
    }
  },

  {
    path: 'newsfeed',
    loadChildren: 'app/components/newsfeed/newsfeed.module#NewsFeedModule',
    canActivate: [AuthGuardLoginCheckService],
    data: {
      title: 'NewsFeed'
    }
  },
  {
    path: 'user',
    loadChildren: 'app/components/user-profile/viewprofile/viewprofile.module#ViewprofileModule',
    canActivate: [UserAgentService,AuthGuardLoginCheckService],

    data: {
      title: 'Profile'
    }
  },
  {
    path: 'class',
    loadChildren: 'app/components/user-profile/viewprofile/viewprofile.module#ViewprofileModule',
    canActivate: [UserAgentService,AuthGuardLoginCheckService],

    data: {
      title: 'Profile'
    }
  },
  {
    path: 'edit-user',
    loadChildren: 'app/components/user-profile/edit-profile/edit-profile.module#EditProfileModule',
    canActivate: [AuthGuardLoginCheckService],

    data: {
      title: 'Edit Profile'
    }
  },
  {
    path: 'user-setting',
    loadChildren: 'app/components/settings/settings.module#SettingsModule',
    canActivate: [AuthGuardLoginCheckService],

    data: {
      title: 'User Settings'
    }
  },
  {
    path: 'explore',
    loadChildren: 'app/components/explore-page/explore-page.module#ExplorePageModule',
    canActivate: [AuthGuardLoginCheckService],

    data: {
      title: 'Explore'
    }
  },
  {
    path: 'UserLicenseAgreement',
    loadChildren: 'app/components/static-pages/static-pages.module#StaticPagesModule',
    data: {
      title: 'UserLicenseAgreement'
    }
  },
  {
    path: 'privacypolicy',
    loadChildren: 'app/components/static-pages/static-pages.module#StaticPagesModule',
    data: {
      title: ''
    }
  },
  {
    path: 'temsofservice',
    loadChildren: 'app/components/static-pages/static-pages.module#StaticPagesModule',
    data: {
      title: ''
    }
  },
  {
    path: 'faqs',
    loadChildren: 'app/components/static-pages/static-pages.module#StaticPagesModule',
    data: {
      title: ''
    }
  },
  {
    path: 'aboutus',
    loadChildren: 'app/components/static-pages/static-pages.module#StaticPagesModule',
    canActivate: [AuthGuardService],
    data: {
      title: ''
    }
  },
  {
    path: 'forschool',
    loadChildren: 'app/components/school-component/school.module#SchoolModule',
    data: {
      title: 'For School'
    }
  },
  {
    path: 'forteacher',
    loadChildren: 'app/components/teacher-component/teacher.module#TeacherModule',
    data: {
      title: 'For Teacher'
    }
  },
  {
    path: 'aboutmyu',
    loadChildren: 'app/components/about-us-component/about-us-module.module#AboutUsModuleModule',
    data: {
      title: 'About MyU'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
