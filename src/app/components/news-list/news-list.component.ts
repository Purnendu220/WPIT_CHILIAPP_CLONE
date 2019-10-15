import { element } from 'protractor';
import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {NewsFeedRequest} from '../../core/model/newsfeedrequest.model';
import {News} from '../../core/model/news-model';
import {
  Constants,
  InfiniteScroll,
  ObjectMediaTypeList,
  UrlResponseCodes,
  MessagesConstants
} from '../../core/constants';
import {HttpMidlUtilService} from '../../httpWrapperModule/http_midl_util.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UtitlityService} from '../../core/utils.service';
import {StorageService} from '../../core/storage-service.service';
import {NewsCommentComponent} from '../news-comment/news-comment.component';
import * as _ from 'underscore';
import {ShareDataSubscriptionService} from '../common/sharedata-subscription.service';
import {NewsReportComponent} from '../news-report/news-report.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {UserListComponent} from '../user-list/user-list.component';
import {PaginationDto} from '../../core/model/paginationDto';
import {CommonConfirmationPopupComponent} from '../../core/common-confirmation-popup/common-confirmation-popup.component';
import { environment } from '../../../environments/environment';
import { VgAPI } from '../../../../node_modules/videogular2/core';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  @Input() userId: number;
  @Input() type: string;
  @Input() boardId: number;

  public newsList: News[] = [];
  public objectMediaTypesList = ObjectMediaTypeList.objectMediaTypesListDocument;
  public throttle = InfiniteScroll.throttle;
  public scrollDistance = InfiniteScroll.scrollDistance;
  public scrollUpDistance = InfiniteScroll.scrollUpDistance;
  private newsFeedRequest;
  private timestampForPage: number;
  private idForPage = 0;
  private isPaginationCall = true;
  private dataFromWiderWindow = false;
  private checkDataFromWiderWindow = true;
  private pagination: PaginationDto = new PaginationDto();
  public loggedInUserId: number = StorageService.getUserId();
  public responseRecieved: boolean = false;
  public lacaleId = environment.language === 'ar'? "ar-EG":"en-US";
  public otherUserProfileFlag=false;
  public api: VgAPI;

  constructor(private modalService: NgbModal,
              private httpMidlUtilService: HttpMidlUtilService,
              public sanitizer: DomSanitizer,
              private sharedDataNewsAction: ShareDataSubscriptionService,
              private router: Router,
              private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  ngAfterViewChecked() {
    $('[data-fancybox]').fancybox({
      transitionEffect: "circular"
    })
  }


  ngOnInit() {

    window.scrollTo(0, 0);
    this.sharedDataNewsAction.newsData.subscribe(newsActionData => {
      let oldNews: News;
      let dataIndex: number;
      oldNews = _.find(this.newsList, function (newsObject, index) {
        if (newsObject.virtualNewsId === newsActionData['virtualNewsId']) {
          dataIndex = index;
          return true;
        }

      });
      this.newsList[dataIndex] = oldNews;

    });
    /**
     *
     * @type {Subscription}
     */
    this.sharedDataNewsAction.newsPublish
      .subscribe((value) => {
        const tempList = this.newsList;
        this.newsList = value;
        this.newsList.push.apply(this.newsList, tempList);

      });
    this.getNewsFeedData(this.idForPage, this.timestampForPage, 'next');
    if (StorageService.getUserId() != this.userId) {
      this.otherUserProfileFlag = true;
    } else {
      this.otherUserProfileFlag = false;

    }
  }

  refreshNewsList(value) {
    this.newsList = [];
    this.objectMediaTypesList = ObjectMediaTypeList.objectMediaTypesListDocument;
    this.throttle = InfiniteScroll.throttle;
    this.scrollDistance = InfiniteScroll.scrollDistance;
    this.scrollUpDistance = InfiniteScroll.scrollUpDistance;
    this.newsFeedRequest;
    this.timestampForPage;
    this.idForPage = 0;
    this.isPaginationCall = true;
    this.pagination = new PaginationDto();
    this.loggedInUserId = StorageService.getUserId();
    this.userId = value;
    this.getNewsFeedData(this.idForPage, this.timestampForPage, 'next');

  }

  routeUser(event, news?: any) {
    let target = event.target || event.srcElement;
    if (target.id.indexOf('myumention') > -1) {
      const mentionid = target.id.split('_')
      UtitlityService.redirectUser(this.router, 'user', mentionid[1])

    } else if (target.id.indexOf('myuhash') > -1) {
      const hashid = target.id.split('_')
      UtitlityService.redirectUser(this.router, 'newsfeed', hashid[1])

    }
    else if (target.id.indexOf('see_more') > -1) {
      this.newsCommentDialog(news);

    }

  }

  newsLike(news: News) {
    const likeUnLikeRequest = {
      virtualNewsId: news.virtualNewsId,
      userId: StorageService.getUserId(),
      likeToggle: !news.isLiked,
    };

    news.likeCount = !news.isLiked ? news.likeCount + 1 : news.likeCount - 1;
    news.isLiked = !news.isLiked;
    this.httpMidlUtilService.newsLikeUnlike(likeUnLikeRequest, this, true);
  }

  newsCommentDialog(newsObject: News) {
    const modalRef = UtitlityService.openModal(this.modalService, NewsCommentComponent);
    modalRef.componentInstance.newsAction = newsObject;
  }

  openNewsReportDialog(virtualNewsId: number) {
    const modalRef = UtitlityService.openModal(this.modalService, NewsReportComponent);
    modalRef.componentInstance.virtualNewsId = virtualNewsId;
  }

  openLikesUserListPopup(virtualNewsId: number) {
    const modalRef = UtitlityService.openModal(this.modalService, UserListComponent);
    modalRef.componentInstance.listFor = 'newsLikesUserList';
    modalRef.componentInstance.virtualNewsId = virtualNewsId;
    modalRef.componentInstance.listTitile = 'Like User List';
  }

  openViewsUserListPopup(virtualNewsId: number) {
    const modalRef = UtitlityService.openModal(this.modalService, UserListComponent);
    modalRef.componentInstance.listFor = 'newsViewsUserList';
    modalRef.componentInstance.virtualNewsId = virtualNewsId;
    modalRef.componentInstance.listTitile = 'View User List';
  }

  getNewsFeedData(idForPage: number, timestampForPage: number, pageDirection: string) {
    if (!isNaN(this.userId) && this.userId && this.type != 'exploreNews') {
      this.objectMediaTypesList = ObjectMediaTypeList.objectMediaTypesListDocument;
      this.newsFeedRequest = new NewsFeedRequest();
      this.newsFeedRequest.idForPage = idForPage;
      this.newsFeedRequest.pageDirection = 'next';
      this.newsFeedRequest.rows = this.pagination.size;
      this.newsFeedRequest.type = this.type;
      this.newsFeedRequest.userId = this.userId;
      this.newsFeedRequest.boardId = this.boardId;
      this.newsFeedRequest.appVersion = Constants.appVersion;
      this.newsFeedRequest.timestampForPage = timestampForPage;
      this.httpMidlUtilService.getNewsFeedData(this.newsFeedRequest, this, true);
    }
    else if (this.type == 'exploreNews') {
      this.httpMidlUtilService.getExploreNewsList(this.dataFromWiderWindow, this.pagination.createPaginatedUri(), this, true);
    }
    else {
      this.httpMidlUtilService.getHashTagNewsList(this.userId, this.pagination.createPaginatedUri(), this, true);
    }

  }

  public newsDelete(virtualNewsId: number, index: number) {
    this.httpMidlUtilService.deleteNews(virtualNewsId, index, this, true);
  }

  onSuccess(type: any, responseData: any, successId: number) {
    this.responseRecieved = true;
    switch (type) {
      case UrlResponseCodes.getNewsListCode:
        if (responseData.length < this.pagination.size || responseData.length === 0) {
          this.isPaginationCall = false;
        }
        this.newsList.push.apply(this.newsList, responseData);
        this.getTimeStampAndIdForPage(responseData);

        break;

      case UrlResponseCodes.exploreNewsListCode:
        if (responseData.dataFromWiderWindow == true) {
          this.dataFromWiderWindow = responseData.dataFromWiderWindow;
          if (this.checkDataFromWiderWindow) {
            this.checkDataFromWiderWindow = false;
            this.pagination.page = 0;
          }
          if (responseData.data.length === 0) {
            this.pagination.stopPagination = true;

          }
        }
        this.newsList.push.apply(this.newsList, responseData.data);

        break;
      case UrlResponseCodes.newsLikeUnLikeCode:
        break;
      case UrlResponseCodes.newsDeleteCode:
        this.sharedDataNewsAction.postCountChange(1);
        this.newsList.splice(successId, 1);
        break;
      case UrlResponseCodes.hashTagNewsListCode:
        if (responseData.length < this.pagination.size || responseData.length === 0) {
          this.pagination.stopPagination = true;
        }
        this.newsList.push.apply(this.newsList, responseData);
        break;

    }

  }

  onFailure(type: any, response: string, failedId: number) {
    this.showAlertMessage('Error', '', response, 4000);
    switch (type) {
      case UrlResponseCodes.newsLikeUnLikeCode:
        let newsError: News;
        let dataIndex: number;
        newsError = _.find(this.newsList, function (newsObject, index) {
          if (newsObject.virtualNewsId === failedId) {
            dataIndex = index;
            return true;
          }

        });
        newsError.likeCount = !newsError.isLiked ? newsError.likeCount + 1 : newsError.likeCount - 1;
        newsError.isLiked = !newsError.isLiked;
        this.newsList[dataIndex] = newsError;
        break;
    }

  }

  onScrollDown() {
    if (this.isPaginationCall && !isNaN(this.userId) && this.type != 'exploreNews' && this.newsList.length > 0) {
      this.getNewsFeedData(this.idForPage, this.timestampForPage, 'next');

    }
    else if (this.type == 'exploreNews' && this.newsList.length > 0) {
      this.pagination.page = this.pagination.page + 1;
      if (!this.pagination.stopPagination) {
        this.httpMidlUtilService.getExploreNewsList(this.dataFromWiderWindow, this.pagination.createPaginatedUri(), this, true);

      }
    }

    else if (this.newsList.length > 0) {
      this.pagination.page = this.pagination.page + 1;
      if (!this.pagination.stopPagination) {
        this.httpMidlUtilService.getHashTagNewsList(this.userId, this.pagination.createPaginatedUri(), this, true);
      }
    }


  }

  showAlertMessage(type, status, message, erroTime?: any) {
    this.sharedDataNewsAction.show(type, status, message, erroTime);
  }

  getTimeStampAndIdForPage(newsList: News[]) {
    if (newsList && newsList.length > 0) {
      this.idForPage = newsList[newsList.length - 1].virtualNewsId;
      this.timestampForPage = newsList[newsList.length - 1].createdAt;
    }

  }


  onUp() {

  }

  downloadURI(media) {
    if (media.status) {
      window.open(media.mediaPath);
    } else {
      let conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
      conFirmationPopup.componentInstance.parent = this;
      conFirmationPopup.componentInstance.title = MessagesConstants.fileNotFoundTitle;
      conFirmationPopup.componentInstance.message = MessagesConstants.fileNotFoundMessage1 + media.originalMediaName + MessagesConstants.fileNotFoundMessage2;
      conFirmationPopup.componentInstance.showCancel = false;
    }
  }

  navigateUser(route, id?: any) {
    if (id) {
      UtitlityService.redirectUser(this.router, route, id)
      return
    }
    UtitlityService.redirectUser(this.router, route)

  }
  openFancyBox(id,newsMedia,index){
    let strss='';
    newsMedia=newsMedia.filter(item => item.mediaType ==='Image');
   newsMedia.forEach(element => {
    let str='{"src"  : "'+element.mediaPath+'","opts" : {"caption" : "'+element.originalMediaName+'","thumb"   : "'+element.mediaPath+'"}},';
    strss=strss+str;
    });
    var instance = $.fancybox.open(JSON.parse('['+strss.substring(0,strss.length-1)+']'));
    instance.jumpTo( index );

  }
  // pauseAudio(id) {
  //   debugger;
  //   if(this.media_id){      
  //     var AudioElement: any = this.elRef.nativeElement;
  //     var vid = AudioElement.getElementsByClassName(this.media_id);
  //       if(this.media_id != id){
  //         this.media_id.pause();
  //       }
  // }
  //   this.media_id=id;
  //   console.log(id)

  // }
  audioPlaying(event){
    if(this.api){
      this.api.pause();
    }
    this.api=event;
  }

  videoPlaying(event){
    if(this.api){
      this.api.pause();
    }
    this.api=event;
  }
}

