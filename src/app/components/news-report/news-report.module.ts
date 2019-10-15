import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsReportComponent } from './news-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, CoreModule
  ],
  declarations: [NewsReportComponent ],
  entryComponents: [NewsReportComponent],
  exports : [NewsReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsReportModule { }


