import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../core/storage-service.service';
import { HttpUserUtilsService } from '../../httpWrapperModule/http_user_util.service';
import { InfiniteScroll, UrlResponseCodes, MessagesConstants } from '../../core/constants';
import { PaginationDto } from '../../core/model/paginationDto';
import { FollowRequestModel } from '../../core/model/followRequestModel';
import * as _ from 'underscore';
import { ShareDataSubscriptionService } from '../common/sharedata-subscription.service';
import { HttpMidlUtilService } from "../../httpWrapperModule/http_midl_util.service";
import { Router } from '@angular/router';
import { UtitlityService } from '../../core/utils.service';
import { CommonConfirmationPopupComponent } from '../../core/common-confirmation-popup/common-confirmation-popup.component';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() listFor: string;
  @Input() boardId: number;
  @Input() userId: number;
  listData: any[] = [];
  listTitile: string;
  public virtualNewsId: number;
  errorMessage: string;
  pagination: PaginationDto = new PaginationDto();
  responseRecieved :boolean = false;
  public parent:any;

  public throttle = InfiniteScroll.throttle;
  public scrollDistance = InfiniteScroll.scrollDistance;
  public scrollUpDistance = InfiniteScroll.scrollUpDistance;
  public selfUserId=StorageService.getUserId();
  public userName:string='';
  profileMessage:string='';


  constructor(public Browserlocation: PlatformLocation,public activeModal: NgbActiveModal,
    private userService: HttpUserUtilsService,
    private midlService: HttpMidlUtilService,
    private router: Router,
    private subscriptionService: ShareDataSubscriptionService,
    private modalService: NgbModal) {
      
      Browserlocation.onPopState(() => {
        this.activeModal.close('Close Model');
    });  
  }

  ngOnInit() {
    if (this.listFor == 'joinedBoard') {
      this.userService.getJoinedBoard(this.userId, this.pagination.createPaginatedUri(), this, true)
    } else if (this.listFor == 'newsLikesUserList') {
      this.midlService.getNewsLikeUserList(this.virtualNewsId, this.pagination.createPaginatedUri(), this, true)
    } else if (this.listFor == 'newsViewsUserList') {
      this.midlService.getNewsViewUserList(this.virtualNewsId, this.pagination.createPaginatedUri(), this, true)
    } else if (this.listFor == 'boardMember') {
      this.midlService.getBoardmembers(this.boardId, this.pagination.createPaginatedUri(), this, true)
    }
    else {
      this.userService.getFollowerFollowing(this.userId, this.listFor, this.pagination.createPaginatedUri(), this, true);
    }
    this.userName=StorageService.getUser().username;
     this.profileMessage=MessagesConstants.shareUsernameMessage.replace('@username','@'+this.userName);
  }

  folloConfirmation(refObject: any) {
    
    if (refObject.user.isfollow) {
      let conFirmationPopup;
      conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
      conFirmationPopup.componentInstance.parent = this;
      conFirmationPopup.componentInstance.refrenceObject = refObject;
      //conFirmationPopup.componentInstance.message = "";
      conFirmationPopup.componentInstance.message = MessagesConstants.unfollowConfirmation + " <strong>" + refObject.user.name + "</strong> ?";

      // conFirmationPopup.componentInstance.confirmText="";
      // conFirmationPopup.componentInstance.cancelText="cancelText";
    } else {
      this.followToggle(refObject);
    }

  }
  confirmAction(refObject) {
    this.followToggle(refObject);
  }
  cancelAction() {

  }
  followToggle(refObject: any, action?: string, followId?: number) {
    //request model preparation
    if (!action) {
      let followRequestModel = new FollowRequestModel();
      followRequestModel.id = refObject.id;
      followRequestModel.followerUserId = StorageService.getUserId();
      followRequestModel.followedUserId = refObject.user.id;
      followRequestModel.followToggle = !refObject.user.isfollow;
      //instant change
      this.subscriptionService.followingCountChange(refObject.user.isfollow ? "-" : "+");
      refObject.user.isfollow = !refObject.user.isfollow;
      this.userService.postFollowToggle(followRequestModel, this, true);

    } else if (action === 'onFailure') {
      let errorObjectIndex: number;
      //this.listData is original array of objects
      _.find(this.listData, function (followObject, index) {
        if (followObject.id === followId) {
          errorObjectIndex = index;
          return true;
        }
      });
      this.subscriptionService.followingCountChange(this.listData[errorObjectIndex].user.isfollow ? "-" : "+");
      this.listData[errorObjectIndex].user.isfollow = !this.listData[errorObjectIndex].user.isfollow;
    }
  }





  onSuccess(type: any, responsedata: any[]) {
    this.responseRecieved = true;
    if (responsedata.length <= 0) {
      this.pagination.stopPagination = true;
    }
    switch (type) {
      case UrlResponseCodes.getFollowingCode:
        responsedata = JSON.parse(JSON.stringify(responsedata).split('"followed":').join('"user":'));
        this.listData.push.apply(this.listData, responsedata);
        break;
      case UrlResponseCodes.getFollowerCode:
        responsedata = JSON.parse(JSON.stringify(responsedata).split('"follower":').join('"user":'));
        this.listData.push.apply(this.listData, responsedata);
        break;
      case UrlResponseCodes.getJoinedBoardListCode:
        this.listData.push.apply(this.listData, responsedata);
        break;
      case UrlResponseCodes.newsLikesUserListCode:
        this.listData.push.apply(this.listData, responsedata);
        break;
      case UrlResponseCodes.newsViewsUserListCode:
        this.listData.push.apply(this.listData, responsedata);
        break;
      case UrlResponseCodes.boardMember:
        responsedata = JSON.parse(JSON.stringify(responsedata).split('"member":').join('"user":'));
        this.listData.push.apply(this.listData, responsedata);
        break;
    }
  }

  onFailure(type: any, response: string, failedId: any) {
    switch (type) {
      case UrlResponseCodes.getFollowingCode:
        this.errorMessage = response;
        break;
      case UrlResponseCodes.getFollowerCode:
        this.errorMessage = response;
        break;
      case UrlResponseCodes.getJoinedBoardListCode:
        this.errorMessage = response;
        break;
      case UrlResponseCodes.postFollowTogggleCode:
        this.errorMessage = response;
        this.followToggle(null, 'onFailure', failedId.id);
        break;
    }
  }

  onScrollDown() {
    if (!this.pagination.stopPagination) {
      this.pagination.page = this.pagination.page + 1;
      if (this.listFor == 'joinedBoard') {
        this.userService.getJoinedBoard(this.userId, this.pagination.createPaginatedUri(), this, true)
      } else if (this.listFor == 'newsLikesUserList') {
        this.midlService.getNewsLikeUserList(this.virtualNewsId, this.pagination.createPaginatedUri(), this, true)
      } else if (this.listFor == 'newsViewsUserList') {
        this.midlService.getNewsViewUserList(this.virtualNewsId, this.pagination.createPaginatedUri(), this, true)
      } else if (this.listFor == 'boardMember') {
        this.midlService.getBoardmembers(this.boardId, this.pagination.createPaginatedUri(), this, true)
      }
      else {
        this.userService.getFollowerFollowing(this.userId, this.listFor, this.pagination.createPaginatedUri(), this, true);
      }
    }
  }

  onUp() {
    // alert('jdOnUp');

  }
  routeUser(route,id?:any){
  this.activeModal.close('Cross clikc');
  try{this.parent.activeModal.close('Cross clikc');}catch(e){}
  if(id){
    UtitlityService.redirectUser(this.router,route,id)
    return
  }
  UtitlityService.redirectUser(this.router,route)

  }
}
