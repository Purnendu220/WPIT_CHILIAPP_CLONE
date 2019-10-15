import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school.component';
import {RoutingSchoolPage} from './school.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RoutingSchoolPage,
    NgbModule.forRoot()
  ],
  declarations: [SchoolComponent]
})
export class SchoolModule { }
