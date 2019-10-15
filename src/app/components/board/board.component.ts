import { BaseComponentComponent } from './../base-component/base-component.component';
import { MessagesConstants } from './../../core/constants';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppLogger } from '../../core/logger';
import { HttpUserUtilsService } from '../../httpWrapperModule/http_user_util.service';
import { UrlResponseCodes } from '../../core/constants';
import { BoardRequestDto } from '../../core/model/board-request-dto.model';
import { Board } from '../../httpWrapperModule/responseModels/userProfileResponse';
import { ShareDataSubscriptionService } from '../common/sharedata-subscription.service';
import { StorageService } from '../../core/storage-service.service';
import { UtitlityService } from '../../core/utils.service';
import { CommonConfirmationPopupComponent } from '../../core/common-confirmation-popup/common-confirmation-popup.component';
import { ValidationService } from '../common/validation-message-component/validation-service.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-add-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class AddBoardComponent extends BaseComponentComponent implements OnInit {

  addBoardForm: FormGroup;
  editBoardForm: FormGroup;
  boardRequestdata: BoardRequestDto;
  errorInCreateBoard: boolean;
  errorInUpdateBoard: boolean;
  errorMessage: string;
  boardAction: string;
  boardDataToEdit: Board;
  boardIdTodelete: number;
  moveTo: boolean = true;
  public buttonStatus = true;


  constructor(public Browserlocation: PlatformLocation,private modalService: NgbModal, private activeModal: NgbActiveModal, private formbuilder: FormBuilder, private userService: HttpUserUtilsService, private shareBoardDataService: ShareDataSubscriptionService) {
    super();
    Browserlocation.onPopState(() => {
      this.activeModal.close('Close Model');
  });
  }

  ngOnInit() {
    this.addBoardForm = this.formbuilder.group({
      'isPrivate': [''],
      'boardName': ['', [ValidationService.requiredValidator, Validators.maxLength(120)]]
    });

    if (this.boardDataToEdit) {
      this.editBoardForm = this.formbuilder.group({
        'boardId': [this.boardDataToEdit.id],
        'isPrivate': [this.boardDataToEdit.isPrivate],
        'boardName': [this.boardDataToEdit.name, [ValidationService.requiredValidator, Validators.maxLength(120)]]
      });
    }
  }

  openDeleteDialog() {
    const modalRef = UtitlityService.openModal(this.modalService, AddBoardComponent);
    modalRef.componentInstance.boardAction = "deleteBoard";
    modalRef.componentInstance.boardIdTodelete = this.boardDataToEdit.id;
  }


  saveBoard(action: string) {

    if (action == "createBoard" && this.addBoardForm.valid) {
      this.buttonStatus = false;
      this.markFormGroupTouched(this.addBoardForm);
      this.boardRequestdata = new BoardRequestDto();
      this.boardRequestdata.name = this.addBoardForm.value.boardName;
      this.boardRequestdata.isPrivate = this.addBoardForm.value.isPrivate == "" ? false : this.addBoardForm.value.isPrivate;
      this.boardRequestdata.userId = StorageService.getUserId();

      this.userService.createBoard(this.boardRequestdata, this, true);

    } else if (action == "editBoard" && this.editBoardForm.valid) {

      this.markFormGroupTouched(this.editBoardForm);
      this.boardRequestdata = new BoardRequestDto();
      this.boardRequestdata.id = this.editBoardForm.value.boardId;
      this.boardRequestdata.name = this.editBoardForm.value.boardName.trim();
      this.boardRequestdata.isPrivate = this.editBoardForm.value.isPrivate == "" ? false : this.editBoardForm.value.isPrivate;
      this.boardRequestdata.userId = StorageService.getUserId();
      this.userService.updateBoard(this.boardRequestdata, this, true);
    }

  }

  deleteBoard() {
    this.userService.deleteBoard(this.boardIdTodelete, StorageService.getUserId(), this, true);
  }
  moveToArchive(boardId: number) {
    this.userService.archiveBoard(boardId, this, true);
  }

  moveToProfile(boardId: number) {
    this.userService.profileBoard(boardId, this, true);
  }
  public moveToArchiveConfirmation(boardId: number) {
    let conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.refrenceObject = {boarId:boardId,type:"MoveToArchive"};
    conFirmationPopup.componentInstance.title = MessagesConstants.moveToArchiveTitle;
    conFirmationPopup.componentInstance.message = MessagesConstants.moveToArchive;
}

  public moveToProfileConfirmation(boardId: number) {
    let conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.refrenceObject = {boarId:boardId,type:"MoveToProfile"};
    conFirmationPopup.componentInstance.title = MessagesConstants.moveToProfileTitle;
    conFirmationPopup.componentInstance.message = MessagesConstants.moveToProfile;
}
confirmAction(refrenceObject){
  if(refrenceObject.type == "MoveToProfile"){
    this.moveToProfile(refrenceObject.boarId);

  }
  if(refrenceObject.type == "MoveToArchive"){
    this.moveToArchive(refrenceObject.boarId);
  }
}
  private markFormGroupTouched(formGroup: FormGroup) {
    try {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      });
    }
    catch (ex) {
    }
  }

  onSuccess(type: any, responsedata: any) {
    switch (type) {
      case UrlResponseCodes.boardPostCode:
        this.errorInCreateBoard = false;
        this.buttonStatus = true;
        this.shareBoardDataService.boardDataChange({ "action": "addTolist", "data": responsedata });
        this.activeModal.close('Close Model');
        break;
      case UrlResponseCodes.boardPutCode:
        this.errorInUpdateBoard = false;
        this.shareBoardDataService.boardDataChange({ "action": "updateToList", "data": responsedata });
        this.activeModal.close('Close Model');
        break;
      case UrlResponseCodes.boardDeleteCode:
        this.errorInUpdateBoard = false;
        this.shareBoardDataService.boardDataChange({ "action": "removeFromList", "boardId": this.boardIdTodelete });
        this.activeModal.close('Close Model');
        break;
      case UrlResponseCodes.boardArchiveCode:
        this.errorInUpdateBoard = false;
        this.shareBoardDataService.boardDataChange({ "action": "removeFromList", "boardId": responsedata.id });
        this.activeModal.close('Close Model');
        break;
      case UrlResponseCodes.boardProfileCode:
        this.errorInUpdateBoard = false;
        this.shareBoardDataService.boardDataChange({ "action": "removeFromList", "boardId": responsedata.id });
        this.activeModal.close('Close Model');
        break;
    }
  }

  onFailure(type: any, response: string) {
    switch (type) {
      case UrlResponseCodes.boardPostCode:
        this.errorInCreateBoard = true;
        this.buttonStatus = true;
        //this.errorMessage = response;
        break;
      case UrlResponseCodes.boardPutCode:
        this.errorInUpdateBoard = true;
       // this.errorMessage = response;
        break;
      case UrlResponseCodes.boardDeleteCode:
        this.errorInUpdateBoard = true;
      //  this.errorMessage = response;
        break;
      case UrlResponseCodes.boardArchiveCode:
        this.errorInUpdateBoard = true;
        //this.errorMessage = response;
        break;
      case UrlResponseCodes.boardProfileCode:
        this.errorInUpdateBoard = true;
        //this.errorMessage = response;
        break;
    }
  }
}
