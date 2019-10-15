import {ViewprofileComponent} from './viewprofile.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RoutingViewprofile} from './viewprofile.routing';
import {CommonModule} from '@angular/common';
import {BoardListModule} from '../../board-list/board-list.module';
import {NewsListModule} from '../../news-list/news-list.module';
import {CreatePostModule} from '../../create-post/create-post.module';
import { SelectBoardListComponent } from '../../create-post/select-board-list/select-board-list.component';
import { CoreModule } from '../../../core/core.module';
import { UserListModule } from '../../user-list/user-list.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ViewprofileComponent,
  ],
  imports: [
    RoutingViewprofile, 
    BoardListModule, 
    CommonModule , 
    NewsListModule, 
    CreatePostModule,
    CoreModule,
    UserListModule,
    NgbModule.forRoot()

  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ViewprofileModule {
}
