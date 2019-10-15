import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from './board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,CoreModule,NgbModule.forRoot()],
  declarations: [AddBoardComponent],
  entryComponents: [AddBoardComponent],
  exports : [AddBoardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddBoardModule { }


