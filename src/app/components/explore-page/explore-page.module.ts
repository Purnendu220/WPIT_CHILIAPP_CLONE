import { UserListModule } from './../user-list/user-list.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorePageComponent } from './explore-page.component';
import { RoutingExplorePage } from './explore-page.routing.module';
import { ExplorerUserListComponent } from '../explorer-user-list/explorer-user-list.component';
import { UserTypeIdToUserTypePipe } from '../../core/pipe/usertypeIdToUsertype-pipe';
import { NewsListModule } from '../news-list/news-list.module';
import { ExplorerUserListModule } from '../explorer-user-list/explorer-user-list.module';
import { CoreModule } from '../../core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewsCommentModule } from '../news-comment/news-comment.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ExplorePageComponent],

  imports: [
    CommonModule,
    CoreModule,
    NewsListModule,
    InfiniteScrollModule,
    ExplorerUserListModule,
    UserListModule,
    RoutingExplorePage,
    NgbModule.forRoot()

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExplorePageModule { }
