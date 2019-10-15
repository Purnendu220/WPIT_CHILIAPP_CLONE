import { URLSearchParams } from '@angular/http';
import { environment } from './../../../environments/environment';
import { StorageService } from './../../core/storage-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpMidlUtilService } from '../../httpWrapperModule/http_midl_util.service';
import { HttpUserUtilsService } from '../../httpWrapperModule/http_user_util.service';
import { Board } from '../../core/model/board.model';
import { UrlResponseCodes, MessagesConstants } from '../../core/constants';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var $: any;
import { User } from '../../core/model/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtitlityService } from '../../core/utils.service';
import { AddBoardComponent } from '../board/board.component';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import { ShareDataSubscriptionService } from '../common/sharedata-subscription.service';
import { DOCUMENT } from '@angular/platform-browser';
import { CommonConfirmationPopupComponent } from '../../core/common-confirmation-popup/common-confirmation-popup.component';
import { BaseComponentComponent } from '../base-component/base-component.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponentComponent implements OnInit {

  activeTab: string;
  boardList: Board[]=[];
  blockedUserCount: number;
  blockedUserList: any[];
  activerUser: User = StorageService.getUser();
  userDefaultlanguage:string;
  public lacaleId = environment.language == 'ar'? "ar-EG":"en-US";

  constructor(private router:Router,private modalService: NgbModal, private activatedRoute: ActivatedRoute, private userService: HttpUserUtilsService, private midlService: HttpMidlUtilService, private shareBoardDataService: ShareDataSubscriptionService,
    @Inject(DOCUMENT) private document: any) {
      super();
     }

  ngOnInit() {
   if(this.document.URL.indexOf('/ar')>-1){
    this.userDefaultlanguage='ar';
   }else{
    this.userDefaultlanguage='en';

   }
   
    this.activatedRoute.params.subscribe((params: Params) => {
      let queryParam = params['query'];
      if (queryParam == 'blockList') {
        $('.nav-tabs a[href="#' + 'bu' + '"]').tab('show');
        this.tabClick("blocked_user");

      } else {
        $('.nav-tabs a[href="#' + 'va' + '"]').tab('show');
        this.tabClick("view_archive");

      }

    });
    this.shareBoardDataService.boardData.subscribe(boardActionData => {
      if (boardActionData.action == "addTolist") {
        this.boardList.push(boardActionData.data);
      } else if (boardActionData.action == "updateToList") {
        for (let i in this.boardList) {
          if (this.boardList[i].id == boardActionData.data.id) {
            this.boardList[i].name = boardActionData.data.name;
            this.boardList[i].isPrivate = boardActionData.data.isPrivate;
          }
        }
      } else if (boardActionData.action == "removeFromList") {
        for (let i in this.boardList) {
          if (this.boardList[i].id == boardActionData.boardId) {
            this.boardList.splice(+i, 1);
          }
        }
      }
    });
  }
  openDialog(boardAction: string, board: Board) {
    const modalRef = UtitlityService.openModal(this.modalService, AddBoardComponent);
    if (boardAction == "editBoard") {
      modalRef.componentInstance.boardAction = "editBoard";
      modalRef.componentInstance.boardDataToEdit = board;
      modalRef.componentInstance.moveTo = false;
    }
  }


  tabClick(tab: string) {
    this.activeTab = tab;
    if (tab == "view_archive") {
      this.userService.getBoardList(this, true, true);
    } else if (tab == "blocked_user") {
      this.userService.getBlockedUserList(this, true);
    } else if (tab == "notification") {
      this.userService.getUserData(StorageService.getUserId(), this, true);
    }
  }

  unblock(blockedUserId: number) {
    this.userService.postBlockToggle(blockedUserId, false, this, false);
  }

  onNotificationSettingChange(notificationFor) {
    let requestObj = { 'id': this.activerUser.id };
    requestObj[notificationFor] = !this.activerUser[notificationFor];
    this.userService.patchUserData(requestObj, this, true);
  }


  onSuccess(type: any, responsedata: any, succesId?: any) {
    switch (type) {
      case UrlResponseCodes.userBoardListResponseCode:
        this.boardList = responsedata;
        break;
      case UrlResponseCodes.getBlockedUsers:
        this.blockedUserCount = responsedata.totalCount;
        this.blockedUserList = responsedata.data;        
        break;
      case UrlResponseCodes.postBlockTogggleCode:
        for (let i in this.blockedUserList) {
          if (this.blockedUserList[i].id == succesId) {
            this.blockedUserList.splice(+i, 1);
          }
        }
        this.blockedUserCount  = this.blockedUserCount-1;
        break;
      case UrlResponseCodes.getUserCode:
        StorageService.setUser(responsedata);
        break;
      case UrlResponseCodes.putUserCode:
        StorageService.setUser(responsedata);
        break;
      
     
            
    }
  }

  onFailure(type: any, response: string, failedId: any) {
    switch (type) {
      case UrlResponseCodes.userBoardListResponseCode:
        console.log('');
        break;
      case UrlResponseCodes.getBlockedUsers:
        break;
      case UrlResponseCodes.postBlockTogggleCode:
        break;
    }
  }
  routeUser(route,id?:any){
  if(id){
    UtitlityService.redirectUser(this.router,route,id)
    return
  }
  UtitlityService.redirectUser(this.router,route)

  }
  handleLanguageChange(value){
    let completeUrl;
    if(value!=this.userDefaultlanguage){
      StorageService.setDefaultLanguage(value);
      if( StorageService.getDefaultLanguage()==='en'){
        location.assign(environment.hostURLEnglish)

      }else{
        location.assign(environment.hostURLArabic)

      }

    }
   
  }
  openBoardDetail(board) {
   const modalRef = UtitlityService.openModal(this.modalService, BoardDetailComponent);
    modalRef.componentInstance.boardId = board.id;
    modalRef.componentInstance.userId = board.userId;
    modalRef.componentInstance.boardNmae = board.name;
    modalRef.componentInstance.type = "boardPost";
  }
}
