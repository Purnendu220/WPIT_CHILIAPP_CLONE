import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCommentComponent } from './news-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, CoreModule
  ],
  declarations: [NewsCommentComponent ],
  entryComponents: [NewsCommentComponent],
  exports : [NewsCommentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsCommentModule { }


