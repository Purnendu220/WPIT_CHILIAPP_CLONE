import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtitlityService } from '../../core/utils.service';
import { AddBoardComponent } from '../board/board.component';
import { User } from '../../core/model/user.model';
import { ShareDataSubscriptionService } from '../common/sharedata-subscription.service';
import { Board } from '../../httpWrapperModule/responseModels/userProfileResponse';
import { StorageService } from '../../core/storage-service.service';
import { HttpMidlUtilService } from '../../httpWrapperModule/http_midl_util.service';
import { UrlResponseCodes, MessagesConstants } from '../../core/constants';
import * as _ from 'underscore';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import { CommonConfirmationPopupComponent } from '../../core/common-confirmation-popup/common-confirmation-popup.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

  @Input() userData: User;
  @Input() otherUserProfileFlag: boolean;
  public allowedBoard:number;
  public lacaleId=environment.language == 'ar'? "ar-EG":"en-US";


  constructor(private modalService: NgbModal, private shareBoardDataService: ShareDataSubscriptionService, private httpMidlService: HttpMidlUtilService) {

  }

  ngOnInit() {
    this.shareBoardDataService.boardData.subscribe(boardActionData => {
      if (boardActionData.action == "addTolist") {
        this.userData.board.push(boardActionData.data);
      } else if (boardActionData.action == "updateToList") {
        for (let i in this.userData.board) {
          if (this.userData.board[i].id == boardActionData.data.id) {
            this.userData.board[i].name = boardActionData.data.name;
            this.userData.board[i].isPrivate = boardActionData.data.isPrivate;
          }
        }
      } else if (boardActionData.action == "removeFromList") {
        for (let i in this.userData.board) {
          if (this.userData.board[i].id == boardActionData.boardId) {
            this.userData.board.splice(+i, 1);
          }
        }
      }
      StorageService.setUser(this.userData);

    });
    
    this.allowedBoard = this.userData.packageInfo.allowBoards;
  }

  confirmLeaveBoard(board: Board) {
    let conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.refrenceObject = board;
    conFirmationPopup.componentInstance.message = (board.isJoined == 2) ? MessagesConstants.unjojnBoard : MessagesConstants.cancelJoinRequest;
  }
  confirmAction(refObject) {
    this.joinToggle(refObject);
  }

  joinToggle(board: Board) {
    const boardJoinToggleRequest = { "boardId": board.id, "joinedBy": StorageService.getUserId() };
    if (board.isJoined == 0) {
      board.isJoined = (board.isJoined == 0) ? ((board.isPrivate) ? 1 : 2) : 0;
      this.httpMidlService.joinBoard(boardJoinToggleRequest, this, false);
    } else if (board.isJoined == 2 || board.isJoined == 1) {
      board.isJoined = 0;
      this.httpMidlService.unjoinBoard(boardJoinToggleRequest, this, false);
    }
  }

  openDialog(boardAction: string, board: Board) {
    const modalRef = UtitlityService.openModal(this.modalService, AddBoardComponent);
    if (boardAction == "addBoard") {
      modalRef.componentInstance.boardAction = "addBoard";
    } else if (boardAction == "editBoard") {
      modalRef.componentInstance.boardAction = "editBoard";
      modalRef.componentInstance.boardDataToEdit = board;
    } else if (boardAction == "deleteBoard") {
      modalRef.componentInstance.boardAction = "deleteBoard";
    }

  }

  openBoardDetail(board, isJoined) {
    if (isJoined != 2 && this.otherUserProfileFlag == true) {
      let conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
      conFirmationPopup.componentInstance.parent = this;
      conFirmationPopup.componentInstance.message = MessagesConstants.notMemberofBoard;
      conFirmationPopup.componentInstance.cancelText = MessagesConstants.close;
      conFirmationPopup.componentInstance.showConfirm = false;
      return;
    }
    const modalRef = UtitlityService.openModal(this.modalService, BoardDetailComponent);
    modalRef.componentInstance.boardId = board.id;
    modalRef.componentInstance.userId = board.userId;
    modalRef.componentInstance.boardNmae = board.name;
    modalRef.componentInstance.type = "boardPost";
  }

  onSuccess(type: any, responsedata: any) {
    switch (type) {
      case UrlResponseCodes.boardJoinCode:
        break;
    }
  }

  onFailure(type: any, response: string, failedId: any) {
    switch (type) {
      case UrlResponseCodes.boardJoinCode:
        let joinBoardIndex: number;
        _.find(this.userData.board, function (boardobj, index) {
          if (boardobj.id == failedId) {
            joinBoardIndex = index;
            return true;
          }
        });
        this.userData.board[joinBoardIndex].isJoined = 0;
        break;
      case UrlResponseCodes.boardUnjoinCode:
        let unjoinBoardIndex: number;
        _.find(this.userData.board, function (boardobj, index) {
          if (boardobj.id == failedId) {
            unjoinBoardIndex = index;
            return true;
          }
        });
        this.userData.board[unjoinBoardIndex].isJoined = 2;
        break;
    }
  }

}
