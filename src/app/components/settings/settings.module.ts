import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RoutingSettings } from './settings-routing.module';
import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBoardModule } from '../board/board.module';
import { BoardDetailModule } from '../board-detail/board-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    RoutingSettings,
    AddBoardModule,
    BoardDetailModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
