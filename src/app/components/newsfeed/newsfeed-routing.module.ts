import {NewsFeedComponent} from './newsfeed.component';
import {RouterModule, Routes} from '@angular/router';

const routesNewsFeed: Routes = [
  {
    path:':userId',
    component: NewsFeedComponent
  },
  {
    path: '',
    component: NewsFeedComponent
  }


];

export const routingNewsFeed = RouterModule.forChild(routesNewsFeed);
