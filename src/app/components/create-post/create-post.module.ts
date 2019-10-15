import {CoreModule} from './../../core/core.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from './create-post.component';
import {WebCamModule} from 'ack-angular-webcam';
import {SelectBoardListComponent} from './select-board-list/select-board-list.component';
import {FormsModule} from '@angular/forms';
import {CommonConfirmationPopupComponent} from '../../core/common-confirmation-popup/common-confirmation-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WebCamModule,
    CoreModule
  ],
  declarations: [CreatePostComponent, SelectBoardListComponent],
  exports: [
    CreatePostComponent, SelectBoardListComponent
  ],
  entryComponents: [SelectBoardListComponent],

})
export class CreatePostModule {

}
