import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardDetailComponent } from './board-detail.component';
import { NewsListModule } from '../news-list/news-list.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserListModule } from '../user-list/user-list.module';

@NgModule({
  imports: [CommonModule,
    InfiniteScrollModule,
    NewsListModule,
    UserListModule
  ],
  declarations: [BoardDetailComponent],
  entryComponents: [BoardDetailComponent],
  exports: [BoardDetailComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BoardDetailModule {
}
