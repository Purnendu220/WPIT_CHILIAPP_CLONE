import { Component, Input, OnInit } from '@angular/core';
import { HttpUserUtilsService } from '../../httpWrapperModule/http_user_util.service';
import { ExplorerRequestModel } from '../../core/model/explorerrequest.model';
import { UserBasic } from '../../core/model/user-basic.model';
import { UrlResponseCodes } from '../../core/constants';
import { ShareDataSubscriptionService } from '../common/sharedata-subscription.service';
import { FollowRequestModel } from '../../core/model/followRequestModel';
import * as _ from 'underscore';
import { StorageService } from '../../core/storage-service.service';
import { UtitlityService } from '../../core/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorer-user-list',
  templateUrl: './explorer-user-list.component.html',
  styleUrls: ['./explorer-user-list.component.scss']
})
export class ExplorerUserListComponent implements OnInit {

  @Input() userId: number;
  public otherUniversityUser: UserBasic[] = [];
  public ownUniversityUser: UserBasic[] = [];
  public isMultipleRequest: boolean;
  public listData = [];
  public excludedUser: any;
  private explorerRequestModel: ExplorerRequestModel;

  constructor(private router: Router, private httpUserUtilsService: HttpUserUtilsService, private shareDataSubscriptionService: ShareDataSubscriptionService) {
  }

  ngOnInit() {
    this.getExplorerData('ownUniversity', 'most', null, 0, UrlResponseCodes.getExploreOwnUniversityCode);
    this.getExplorerData('otherUniversity', 'most', null, 0, UrlResponseCodes.getExploreOtherUniversityCode);
  }

  followToggle(refObject: any, ownOrOther: string, action?: string, followId?: number, event?) {
    if (!action) {
      const followRequestModel = new FollowRequestModel();
      followRequestModel.id = refObject.id;
      followRequestModel.followerUserId = StorageService.getUserId();
      followRequestModel.followedUserId = refObject.id;
      followRequestModel.followToggle = !refObject.isfollow;
      followRequestModel['ownOrOther'] = ownOrOther;
      refObject.isfollow = !refObject.isfollow;
      this.httpUserUtilsService.postFollowToggle(followRequestModel, this, true);

    } else if (action === 'onFailure') {
      if (ownOrOther === 'other') {
        let errorObjectIndex: number;
        _.find(this.otherUniversityUser, function (followObject, index) {
          if (followObject.id === followId) {
            errorObjectIndex = index;
            return true;
          }
        });
        this.otherUniversityUser[errorObjectIndex].isfollow = !this.otherUniversityUser[errorObjectIndex].isfollow;
      } else if (ownOrOther === 'own') {
        let errorObjectIndex: number;
        _.find(this.ownUniversityUser, function (followObject, index) {
          if (followObject.id === followId) {
            errorObjectIndex = index;
            return true;
          }
        });
        this.ownUniversityUser[errorObjectIndex].isfollow = !this.ownUniversityUser[errorObjectIndex].isfollow;
      }

    }
    if (event) {
      event.stopPropagation();
    }
  }

  removeExploreUser(removefrom, i) {
    if (removefrom == "otherUniversityUser") {
      this.otherUniversityUser.splice(i, 1);
    } else if (removefrom == "ownUniversityUser") {
      this.ownUniversityUser.splice(i, 1);
    }
  }

  onSuccess(type: any, responseData: any) {
    switch (type) {
      case UrlResponseCodes.getExploreOwnUniversityCode:
        this.ownUniversityUser.push.apply(this.ownUniversityUser, responseData);        
        break;
      case UrlResponseCodes.getExploreOtherUniversityCode:
        this.otherUniversityUser.push.apply(this.otherUniversityUser, responseData);    
    }

  }

  onFailure(type: any, response: string, failedId: any) {
    switch (type) {
      case UrlResponseCodes.postFollowTogggleCode:
        this.followToggle(null, failedId.ownOrOther, 'onFailure', failedId.id);
        break;
    }
    this.showAlertMessage('Error', '', response, 4000);
  }

  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
  }

  getExplorerData(filterType: string, popularCategory: string, excludedUsers: any, page: number, urlCode: string) {
    this.explorerRequestModel = new ExplorerRequestModel();
    this.explorerRequestModel.papularCategory = popularCategory;
    this.explorerRequestModel.page = page;
    this.explorerRequestModel.excludeUsers = excludedUsers;
    this.explorerRequestModel.filterType = filterType;
    this.httpUserUtilsService.getUserExplorer(this.explorerRequestModel, this, true, urlCode);
  }

  getIdListFromList(objectList) {
    const idList: string[] = [];
    for (let i = 0; i < objectList.length; i++) {
      idList.push(objectList[i].id);
    }
    return idList;

  }
  routeUser(route, id?: any) {
    if (id) {
      UtitlityService.redirectUser(this.router, route, id)
      return
    }
    UtitlityService.redirectUser(this.router, route)
  }
  routeExplore(exploreFor) {
    UtitlityService.redirectTo(this.router, "/explore?for=" + exploreFor);
  }
}
