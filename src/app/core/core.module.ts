import { NgModule } from '@angular/core';
import { ValidateOnBlur } from './validate-on-blur';
import { FileSizePipe } from './pipe/fileSize.pipe';
import { ValidationMessageComponent } from '../components/common/validation-message-component/validation-message-component.component';
import { CommonModule } from '@angular/common';
import { DefaultImage } from './pipe/defaultImg-pipe';
import { TimeStampToDayPipe } from './pipe/timestamptoday-pipe';
import { DateFormatPipe } from './pipe/dateformat-pipe';
import { UserTypeIdToUserTypePipe } from './pipe/usertypeIdToUsertype-pipe';
import { HashTagOrMentionedUserPipe } from './pipe/hashtagormentioneduser-pipe';
import { RouteTransformerDirective } from './routetransformer.directive';
import { FileTypeImagePipe } from './pipe/filetypeimage-pipe';
import { NotificationmsgPrepare } from './pipe/notificationmsgprepare-pipe';
import { MyFilterPipe } from './pipe/filterarray.pipe';
import { NotifcationLogoChangePipe } from './pipe/notifcation-logo-change.pipe';


@NgModule({
  imports: [CommonModule],
  declarations: [ValidateOnBlur, TimeStampToDayPipe, ValidationMessageComponent, DefaultImage, FileSizePipe, DateFormatPipe, UserTypeIdToUserTypePipe, HashTagOrMentionedUserPipe, RouteTransformerDirective, FileTypeImagePipe, NotificationmsgPrepare,MyFilterPipe, NotifcationLogoChangePipe],
  providers: [],
  exports: [ValidationMessageComponent, DefaultImage, TimeStampToDayPipe, FileSizePipe, DateFormatPipe, UserTypeIdToUserTypePipe, HashTagOrMentionedUserPipe, RouteTransformerDirective, FileTypeImagePipe, NotificationmsgPrepare,MyFilterPipe,NotifcationLogoChangePipe],

})
export class CoreModule {
}
