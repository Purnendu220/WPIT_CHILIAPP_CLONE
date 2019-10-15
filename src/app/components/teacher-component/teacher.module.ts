import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import {RoutingTeacherPage} from './teacher.routing';

@NgModule({
  imports: [
    CommonModule,
    RoutingTeacherPage
  ],
  declarations: [TeacherComponent]
})
export class TeacherModule { }
