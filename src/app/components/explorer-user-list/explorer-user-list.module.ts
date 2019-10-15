import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerUserListComponent } from './explorer-user-list.component';
import { CoreModule } from '../../core/core.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  declarations: [ExplorerUserListComponent],
  exports: [ExplorerUserListComponent]
})
export class ExplorerUserListModule { }
