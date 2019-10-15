import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageCropComponent } from '../imageCroppingPopup/imageCrop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule.forRoot(),
    ],
  entryComponents: [ImageCropComponent],
  exports:[ImageCropComponent],
  declarations: [ImageCropComponent]
})
export class ImageCropModule { }
