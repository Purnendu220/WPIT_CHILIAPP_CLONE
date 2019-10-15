import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { CoreModule } from '../../core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    InfiniteScrollModule,
    RouterModule
  ],
  entryComponents: [UserListComponent],
  declarations: [UserListComponent],
  exports: [UserListComponent]
})
export class UserListModule { }
