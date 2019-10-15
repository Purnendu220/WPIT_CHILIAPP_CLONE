import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list.component';
import { AddBoardModule } from '../board/board.module';
import { BoardDetailModule } from '../board-detail/board-detail.module';

@NgModule({
  imports: [CommonModule, AddBoardModule, BoardDetailModule],
  declarations: [BoardListComponent],
  exports: [BoardListComponent]
})
export class BoardListModule {

}
