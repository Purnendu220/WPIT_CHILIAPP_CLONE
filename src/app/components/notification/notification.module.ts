import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../common/loader/loader.module';


@NgModule({
  imports: [
    InfiniteScrollModule,
    CommonModule,
    CoreModule,
    RouterModule,
    LoaderModule
  ],
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { }
