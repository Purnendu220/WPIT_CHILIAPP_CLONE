import { BoardListComponent } from './../../board-list/board-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpUserUtilsService } from '../../../httpWrapperModule/http_user_util.service';
import { NewsType, UrlResponseCodes, UserType, MessagesConstants } from '../../../core/constants';
import { StorageService } from '../../../core/storage-service.service';
import { User } from "../../../core/model/user.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtitlityService } from '../../../core/utils.service';
import { UserListComponent } from '../../user-list/user-list.component';
import { ShareDataSubscriptionService } from '../../common/sharedata-subscription.service';
import { FollowRequestModel } from '../../../core/model/followRequestModel';
import { NewsListComponent } from '../../news-list/news-list.component';
import { CommonConfirmationPopupComponent } from '../../../core/common-confirmation-popup/common-confirmation-popup.component';
import { environment } from '../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {
  subscription: any;

  userId: number
  errorMessage: string = '';
  errorInGetUserData = false;
  userData: User;
  userType: string
  otherUserProfileFlag: boolean = false;
  public blockedUserData: any = {
    isBlocked: false,
    id: null,
    username: ''
  };
  type: string;
  @ViewChild('boardList') child: BoardListComponent;
  @ViewChild('newsList') newsChild: NewsListComponent;
  public lacaleId=environment.language == 'ar'? "ar-EG":"en-US";


  constructor(private userService: HttpUserUtilsService, private activatedRoute: ActivatedRoute, private modalService: NgbModal, private router: Router
    , private shareDataSubscriptionService: ShareDataSubscriptionService) {
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
    $('.autoSideBarRight')
      .theiaStickySidebar({
        'additionalMarginTop': 90
      });

    $('.autoSideBarLeft')
      .theiaStickySidebar({
        'additionalMarginTop': 250
      });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.userService.getUserData(this.userId, this, true);
      this.type = NewsType.ownPost;
      if (StorageService.getUserId() != this.userId) {
        this.otherUserProfileFlag = true;
      } else {
        this.otherUserProfileFlag = false;

      }
      if (this.userData) {
        try {
          this.newsChild.refreshNewsList(this.userId);
        }
        catch (e) {

        }
      }

    });

    /**
     * this subscription add for post count decrease  when the post is deleted by the logged in user
     * @type {Subscription}
     */
    this.subscription = this.shareDataSubscriptionService.postCount
      .subscribe((value) => {
        if (value) {
          this.userData.newsCount -= 1;

        }


      });
    this.subscription = this.shareDataSubscriptionService.newsAddNews
      .subscribe((value) => {
        if (value !== undefined && value > 0) {
          this.userData.newsCount = this.userData.newsCount + value;

        }
      });
    this.shareDataSubscriptionService.followingCount.subscribe(action => {
      if (this.userId == StorageService.getUserId()) {
        if (action == "-") {
          this.userData.followingCount -= 1;
        } else if (action == "+") {
          this.userData.followingCount += 1;
        }
      }
    });

  }

  sendMessageInProgressAlertInfo() {
    const conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.message = MessagesConstants.chatInProgressAlert;
    conFirmationPopup.componentInstance.cancelText = MessagesConstants.close;
    conFirmationPopup.componentInstance.showConfirm = false;
    conFirmationPopup.componentInstance.title = MessagesConstants.chatInProgressTitle;

  }

  openUserListPopup(listFor: string, listCount?: number) {
    if (listCount <= 0) {
      return;
    }
    const modalRef = UtitlityService.openModal(this.modalService, UserListComponent);
    modalRef.componentInstance.listFor = listFor;
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.listTitile = (listFor === 'following')
    ? MessagesConstants.following : (listFor === 'follower') ? MessagesConstants.follower : MessagesConstants.joinedBoard;
  }

  unFollowConfirmation() {
    const conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.message = MessagesConstants.unfollowConfirmation + " <strong>" + this.userData.name + "</strong> ?";
  }
  blockedUserMessage() {
    const unBlockedUser = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    unBlockedUser.componentInstance.parent = this;
    unBlockedUser.componentInstance.showConfirm = false;
    unBlockedUser.componentInstance.cancelText = 'ok';
    let unblockmessage = MessagesConstants.blockedUserMessage1.replace("(user)", this.userData.name);
    unBlockedUser.componentInstance.message = unblockmessage;
  }

  confirmAction(type: string) {
    if (type === 'blockOrUnblockUser') {
      this.blockOrUnblockUser(this.blockedUserData.id, this.blockedUserData.isBlocked);
    } else {
      this.followToggle();
    }
  }

  followToggle(action?: string) {
    //request model preparation
    if (!this.userData.isBlocked) {
      if (!action) {
        let followRequestModel = new FollowRequestModel();
        followRequestModel.followedUserId = this.userId;
        followRequestModel.followerUserId = StorageService.getUserId()
        followRequestModel.followToggle = !this.userData.isfollow;
        //instant change
        this.userData.followerCount = this.userData.followerCount + (this.userData.isfollow ? (-1) : (1));
        this.userData.isfollow = !this.userData.isfollow;
        this.userService.postFollowToggle(followRequestModel, this, true);
      } else if (action == 'onFailure') {
        this.userData.followerCount = this.userData.followerCount + (this.userData.isfollow ? (-1) : (1));
        this.userData.isfollow = !this.userData.isfollow
      }
    }
    else {
      this.blockedUserMessage();
    }
  }

  navigateToEditProfile() {
    UtitlityService.redirectUser(this.router, 'edit-user');
  }

  navigateToSettings() {
    UtitlityService.redirectUser(this.router, 'user-setting');
  }

  public blockUnblockConfirmation() {
    const conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.refrenceObject = 'blockOrUnblockUser';
    conFirmationPopup.componentInstance.title = (this.blockedUserData.isBlocked ? MessagesConstants.unblock : MessagesConstants.block) + ' @' + this.blockedUserData.username + '?';
    conFirmationPopup.componentInstance.message = this.blockedUserData.isBlocked ? MessagesConstants.unBlockUser : MessagesConstants.blockUser;
    conFirmationPopup.componentInstance.confirmText = this.blockedUserData.isBlocked ? MessagesConstants.unblock : MessagesConstants.block;
    conFirmationPopup.componentInstance.cancelText = MessagesConstants.cancel;

  }


  private blockOrUnblockUser(userId: number, isBlocked: boolean) {
    this.blockedUserData.isBlocked = !isBlocked;
    this.userService.blockUnblockUser(userId, this.blockedUserData.isBlocked, this, true);
  }

  onSuccess(type: any, responsedata: any) {
    switch (type) {
      case UrlResponseCodes.getUserCode:
        this.errorInGetUserData = false;
        this.userData = responsedata;
        this.blockedUserData.isBlocked = this.userData.isBlocked;
        this.blockedUserData.id = this.userData.id;
        this.blockedUserData.username = this.userData.username;
        if (this.userData.isBlocked) {

          return;
        }
        this.userType = UserType.typeIdList[responsedata.userTypeId]
        if (this.child) {
          this.child.otherUserProfileFlag = this.otherUserProfileFlag;
          this.child.userData = this.userData;
        }

        break;
      case UrlResponseCodes.blockOrUnblockUserCode:
        this.ngOnInit();

        break;
    }
  }

  onFailure(type: any, response: string) {
    switch (type) {
      case UrlResponseCodes.loginUserCode:
        this.errorInGetUserData = true;
        this.errorMessage = response;
        break;
      case UrlResponseCodes.postFollowTogggleCode:
        this.errorMessage = response;
        this.followToggle('onFailure');
        break;
      case UrlResponseCodes.blockOrUnblockUserCode:
        this.blockedUserData.isBlocked = !this.blockedUserData.isBlocked;
        break;
    }
  }

}
