import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsListComponent} from './news-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {CoreModule} from '../../core/core.module';
import {NewsReportModule} from '../news-report/news-report.module';
import { RouterModule } from '@angular/router';
import {AudioPlayerModule} from '../audio-player/audio-player.module';
import {VideoPlayerModule} from '../video-player/video-player.module';
import { NewsCommentModule } from '../news-comment/news-comment.module';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NewsCommentModule,
    NewsReportModule,
    CoreModule,
    RouterModule,
    AudioPlayerModule,
    VideoPlayerModule
  ],
  declarations: [NewsListComponent],
  exports: [
    NewsListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsListModule {

}
