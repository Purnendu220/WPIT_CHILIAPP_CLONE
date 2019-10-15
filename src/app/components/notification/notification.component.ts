import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { HttpUserUtilsService } from '../../httpWrapperModule/http_user_util.service';
import { HttpSuccesFailureResponse } from '../../httpWrapperModule/http_wrapper_response.intreface';
import { Subscription } from 'rxjs';
import { StorageService } from '../../core/storage-service.service';
import { NotificationTypes } from '../../core/model/notificationType.enum';
import { UrlResponseCodes, Constants, InfiniteScroll } from '../../core/constants';
import { UtitlityService } from '../../core/utils.service';
import { Router } from '@angular/router';
import { LoaderComponentService } from '../common/loader/loader.service';
import { LoaderState } from '../common/loader/loader';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {


  throttle = InfiniteScroll.throttle;
  scrollDistance = InfiniteScroll.scrollDistance;
  scrollUpDistance = InfiniteScroll.scrollUpDistance;

  @Input() activeTab: string;
  public notificationLoader: boolean = false;
  public youData: Array<Notification> = [];
  public followData: Array<Notification> = [];
  public joinBoardRequestInitData: any;
  public joinRequestData: Array<any> = [];
  private pageInfo: any = { "you": 0, "following": 0, "joinRequest": 0, "youLoadMore": true, "followingLoadMore": true, "joinRequestLoadMore": true };
  public noJoinRequestMsg = "";


  constructor(private http_user: HttpUserUtilsService, private router: Router, private loaderService: LoaderComponentService) { }

  ngOnInit() {
    this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        if (state.loaderClass == "loaderNotification") {
          this.notificationLoader = true;
        } else {
          this.notificationLoader = false;
        }
      });

    this.activeTab = "you";
    this.callNotificationApi();
  }

  onSelectChange(notificationFor) {
    if (notificationFor == "you") {
      this.pageInfo.you = 0;
      this.pageInfo.youLoadMore = true;
      this.activeTab = notificationFor;
      this.callNotificationApi();
    } else if (notificationFor == "following") {
      this.pageInfo.you = 0;
      this.pageInfo.followingLoadMore = true;
      this.activeTab = notificationFor;
      this.callNotificationApi();
    } else if (notificationFor == "joinRequest") {
      this.activeTab = notificationFor;
      this.pageInfo.you = 0;
      this.pageInfo.followingLoadMore = true;
      this.callJoinBoardRequestApi();
    }
  }
  approveOrreject(joinRequestObj, action) {
    if (action == "accept") {
      this.http_user.acceptOrReject(joinRequestObj, 2, this, true);
    } else if (action == "reject") {
      this.http_user.acceptOrReject(joinRequestObj, 0, this, true);
    }
  }

  callNotificationApi() {
    this.http_user.notification(StorageService.getUserId(), this.pageInfo[this.activeTab], this.activeTab, this, true)
  }
  callJoinBoardRequestApi() {
    this.http_user.newboardrequest(StorageService.getUserId(), this.pageInfo[this.activeTab], this, true)
  }

  onScrollDown(event: any, notificationFor: any) {
    let loadMore = notificationFor + "LoadMore";

    if (this.pageInfo[loadMore]) {
      this.pageInfo[notificationFor] = this.pageInfo[this.activeTab] + 1;
      this.callNotificationApi();
    }
  }

  routeUser(route, id?: any) {
    $('.followingYou').slideUp('slow');

    if (id) {
      UtitlityService.redirectUser(this.router, route, id)
      return
    }
    UtitlityService.redirectUser(this.router, route)
  }


  removeJoinBoardRequestFromList(joinRequestObj) {
    for (let i = 0; i < this.joinRequestData.length; i++) {
      if (this.joinRequestData[i].joinedBy == joinRequestObj.joinedBy && this.joinRequestData[i].boardId == joinRequestObj.boardId) {
        this.joinRequestData.splice(i, 1);
        this.noJoinRequestMsg = (this.joinRequestData.length <= 0) ? "No pending request found!" : "";
        break;
      }
    }
  }

  onSuccess(type: any, responsedata: any, succesObj: any) {
    switch (type) {
      case UrlResponseCodes.notificationsYouType:
        this.pageInfo.youLoadMore = (responsedata.notifications) ? true : false;
        if (this.pageInfo.you == 0) {
          this.youData = responsedata.notifications;
          this.joinBoardRequestInitData = responsedata.joinBoardRequest;
        } else {
          this.youData.push.apply(this.youData, responsedata.notifications);
        }
        break;
      case UrlResponseCodes.notificationsFollowingType:
        this.pageInfo.followingLoadMore = (responsedata.notifications) ? true : false;
        if (this.pageInfo.following == 0) {
          this.followData = responsedata.notifications;
        } else {
          this.followData.push.apply(this.followData, responsedata.notifications);
        }
        break;
      case UrlResponseCodes.NewBoardRequest:
        this.pageInfo.joinRequestLoadMore = (responsedata) ? true : false;
        if (this.pageInfo.joinRequest == 0) {
          this.noJoinRequestMsg = (responsedata.length <= 0) ? "No pending request found!" : "";
          this.joinRequestData = responsedata;
        } else {
          this.youData.push.apply(this.youData, responsedata.notifications);
        }
        break;
      case UrlResponseCodes.joinrequestAccept:
        this.removeJoinBoardRequestFromList(succesObj);
        break;
      case UrlResponseCodes.joinrequestReject:
        this.removeJoinBoardRequestFromList(succesObj);
        break;
    }
  }

  onFailure(type: any, response: string) {
  }
}
