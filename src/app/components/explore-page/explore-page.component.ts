import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/storage-service.service';
import { UserBasic } from '../../core/model/user-basic.model';
import { HttpUserUtilsService } from '../../httpWrapperModule/http_user_util.service';
import { ExplorerRequestModel } from '../../core/model/explorerrequest.model';
import { UrlResponseCodes, Constants, InfiniteScroll } from '../../core/constants';
import * as _ from 'underscore';
import { FollowRequestModel } from '../../core/model/followRequestModel';
import { UtitlityService } from '../../core/utils.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {

  activeUserId: number;
  public popularUsers: UserBasic[] = [];
  private excludeUsers: UserBasic[] = [];
  private page: number = 0;
  private popularCategory = 'most';
  public activeTab: string;
  //pagination

  public throttle = InfiniteScroll.throttle;
  public scrollDistance = InfiniteScroll.scrollDistance;
  public scrollUpDistance = InfiniteScroll.scrollUpDistance;
  private isPaginationCall = true;

  constructor(private router: Router, private httpUserUtilsService: HttpUserUtilsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['for'] == "other_school") {
        this.activeTab = "otherSchool";
        this.startProcess("other_school");
      } else if (params['for'] == "own_school") {
        this.activeTab = "ownSchool";
        this.startProcess("own_school");
      } else if (params['for'] == "news") {
        this.activeTab = "exploreNews";
        this.startProcess("news");
      }
    });
    this.activeUserId = StorageService.getUserId();
  }

  tabClick(dataFor: string) {
    UtitlityService.redirectTo(this.router, "/explore?for=" + dataFor);
  }

  startProcess(dataFor: string) {
    //Initialize data
    this.page = 0;
    this.popularCategory = 'most';
    this.excludeUsers = [];
    this.popularUsers = [];


    if (dataFor == "own_school") {
      this.activeTab = "ownSchool";
      this.doProcess("ownUniversity", UrlResponseCodes.getExploreOwnUniversityCode);
    } else if (dataFor == "other_school") {
      this.activeTab = "otherSchool";
      this.doProcess("otherUniversity", UrlResponseCodes.getExploreOtherUniversityCode);
    } else if (dataFor == "news") {
      this.activeTab = "exploreNews";
    }
  }




  doProcess(filterType, urlResponseCode) {
    let explorerRequestModel: ExplorerRequestModel = new ExplorerRequestModel();
    explorerRequestModel.papularCategory = this.popularCategory;
    explorerRequestModel.page = this.page;
    explorerRequestModel.excludeUsers = this.excludeUsers;
    explorerRequestModel.filterType = filterType;
    this.httpUserUtilsService.getUserExplorer(explorerRequestModel, this, true, urlResponseCode);
  }

  onSuccess(type: any, responseData: any) {
    switch (type) {
      case UrlResponseCodes.getExploreOwnUniversityCode:
        if (this.activeTab == "ownSchool") {
          this.popularUsers.push.apply(this.popularUsers, responseData);
        }
        break;
      case UrlResponseCodes.getExploreOtherUniversityCode:
        if (this.activeTab == "otherSchool") {
          this.popularUsers.push.apply(this.popularUsers, responseData);
        }
        break;
    }

    //Prepare array of mostPopular users to exlude from least popular users
    if (this.popularCategory == "most") {
      let tempExcludeUsers = [];
      _.map(this.popularUsers, function (excludeUser) {
        tempExcludeUsers.push(excludeUser.id);
      });
      this.excludeUsers = tempExcludeUsers;
      this.popularCategory = "least";
      this.page = 0;
      if (responseData.length < 20) {
        //if no list recieved for most popular then call for least popular
        if (this.activeTab == "ownSchool") {
          this.doProcess("ownUniversity", UrlResponseCodes.getExploreOwnUniversityCode);
        } else if (this.activeTab == "otherSchool") {
          this.doProcess("otherUniversity", UrlResponseCodes.getExploreOtherUniversityCode);
        }
      }
    } else {
      this.page = this.page + 1;
      if (responseData.length <= 0) {
        this.isPaginationCall = false;
      }
    }
  }
  onFailure(type: any, response: string, failedId) {
    switch (type) {
      case UrlResponseCodes.postFollowTogggleCode:
        this.followToggle(null, "onFailure", failedId);
    }
  }

  onScrollDown() {
    if (this.isPaginationCall) {
      if (this.activeTab == "ownSchool") {
        this.doProcess("ownUniversity", UrlResponseCodes.getExploreOwnUniversityCode);
      } else if (this.activeTab == "otherSchool") {
        this.doProcess("otherUniversity", UrlResponseCodes.getExploreOtherUniversityCode);
      }
    }
  }



  //Follow toggle
  followToggle(refObject: any, action?: string, userId?: number, event?) {
    //request model preparation
    if (!action) {
      let followRequestModel = new FollowRequestModel();
      followRequestModel.id = refObject.id;//this is to handle failed request
      followRequestModel.followerUserId = StorageService.getUserId();
      followRequestModel.followedUserId = refObject.id;
      followRequestModel.followToggle = !refObject.isfollow;
      //instant change      
      refObject.isfollow = !refObject.isfollow;
      this.httpUserUtilsService.postFollowToggle(followRequestModel, this, true);

    } else if (action == 'onFailure') {
      let errorObjectIndex: number;
      //this.listData is original array of objects
      _.find(this.popularUsers, function (userObj, index) {
        if (userObj.id === userId) {
          errorObjectIndex = index;
          return true;
        }
      });
      this.popularUsers[errorObjectIndex].isfollow = !this.popularUsers[errorObjectIndex].isfollow;
    }
    if (event) {
      event.stopPropagation();
    }
  }

  removeExploreUser(ev, i) {
    this.popularUsers.splice(i, 1);
    ev.stopPropagation();
  }
  routeUser(route, id?: any) {
    if (id) {
      UtitlityService.redirectUser(this.router, route, id)
      return
    }
    UtitlityService.redirectUser(this.router, route)

  }

}
