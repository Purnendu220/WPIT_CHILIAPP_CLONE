import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomdatepickerComponent } from './customdatepicker/customdatepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomdatepickerComponent],
  exports:[CustomdatepickerComponent]
})
export class CustomDatePickerModule { }
