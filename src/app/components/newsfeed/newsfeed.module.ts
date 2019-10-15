import {NewsFeedComponent} from './newsfeed.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {routingNewsFeed} from './newsfeed-routing.module';
import {CommonModule} from '@angular/common';
import { BoardListModule } from '../board-list/board-list.module';
import {NewsListModule} from '../news-list/news-list.module';
import {UserTypeIdToUserTypePipe} from '../../core/pipe/usertypeIdToUsertype-pipe';
import {CreatePostModule} from '../create-post/create-post.module';
import { CoreModule } from '../../core/core.module';
import { ExplorerUserListModule } from '../explorer-user-list/explorer-user-list.module';

@NgModule({
  declarations: [NewsFeedComponent],
  imports: [
    routingNewsFeed, CommonModule, CoreModule, BoardListModule, NewsListModule, CreatePostModule, ExplorerUserListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewsFeedModule {
}
