import { MessagesConstants } from './../../../core/constants';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpUserUtilsService } from '../../../httpWrapperModule/http_user_util.service';
import { HttpSuccesFailureResponse } from '../../../httpWrapperModule/http_wrapper_response.intreface';
import { UrlResponseCodes } from '../../../core/constants';
import { BoardListData } from '../../../core/model/boardListResponse.model';
import { ShareDataSubscriptionService } from '../../common/sharedata-subscription.service';
import { BaseComponentComponent } from '../../base-component/base-component.component';

@Component({
  selector: 'app-select-board-list',
  templateUrl: './select-board-list.component.html',
  styleUrls: ['./select-board-list.component.scss']
})
export class SelectBoardListComponent extends BaseComponentComponent implements OnInit,HttpSuccesFailureResponse {
 

  constructor(public activeModal: NgbActiveModal,private httpUserUtilsService:HttpUserUtilsService,private shareDataSubscriptionService:ShareDataSubscriptionService) {
    super();
  }
  public defaultPublicBoard:any={boardName:MessagesConstants.publicOnPost ,masterPostTypeId:'2',isPublicSelected:false};
  public userBoardListData:BoardListData[]=[];
  public selectedBoardList:BoardListData[]=[];
  public parent:any;
  public disableButton=false;
  ngOnInit() {
    this.httpUserUtilsService.getBoardList(this,false, true);
  }

  selectBoard(event,boardData,index){
  let i = this.selectedBoardList.indexOf(boardData);
    if(event.target.checked){
   this.selectedBoardList.push(boardData)
    }else{
   this.selectedBoardList.splice(i,1);
    }
  }
  makePostPublic(event,boardData){
    if(event.target.checked){
     this.defaultPublicBoard.masterPostTypeId=1;
     this.defaultPublicBoard.isPublicSelected=true;
      } else {
        this.defaultPublicBoard.masterPostTypeId=2;
        this.defaultPublicBoard.isPublicSelected=false;
    }
  }
  postNews(){
    let boardIds = [];
    try {
      this.selectedBoardList.forEach(element => {
        boardIds.push(element.id);
      });
    } catch (e) {

    }
    if(boardIds.length>0 ||this.defaultPublicBoard.isPublicSelected == true){
      this.parent.postNews({'selectedBoardIds':boardIds,'defaultPublicBoard':this.defaultPublicBoard})
      this.disableButton=true;
      setTimeout(() => {
        this.disableButton=false;
        }, 2000);
    //this.shareDataSubscriptionService.postNews({'selectedBoardIds':boardIds,'defaultPublicBoard':this.defaultPublicBoard});
    }else{
     this.showAlertMessage("Error","",MessagesConstants.pleaseSelectBoard,4000);
    }
 
  }
  onSuccess(type: any, responsedata: any) {
    switch(type){
      case UrlResponseCodes.userBoardListResponseCode :
      this.userBoardListData = responsedata;
      break;
     
    }
  }
  onFailure(type: any, response: string) {
    switch(type){
      case UrlResponseCodes.userBoardListResponseCode :
      break;
    
     
    }
  }
  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
  }
}
