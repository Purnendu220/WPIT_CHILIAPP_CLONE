import { concat } from 'rxjs/observable/concat';
import { StorageService } from './../../../core/storage-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpUserUtilsService } from '../../../httpWrapperModule/http_user_util.service';
import { HttpSuccesFailureResponse } from './../../../httpWrapperModule/http_wrapper_response.intreface';
import { TypeAheadRequest } from '../../../core/model/type-ahead-request.model';
import { UserBasic } from '../../../core/model/user-basic.model';
import { Router, RouterEvent } from '@angular/router';
import { ShareDataSubscriptionService } from '../sharedata-subscription.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtitlityService } from '../../../core/utils.service';
import { CommonConfirmationPopupComponent } from '../../../core/common-confirmation-popup/common-confirmation-popup.component';
import { MessagesConstants } from '../../../core/constants';
import { LoaderComponentService } from '../loader/loader.service';
import { LoaderState } from '../loader/loader';
import { Observable } from 'rxjs';
import { Http } from '@angular/http'
import 'rxjs/Rx';
import { BaseComponentComponent } from '../../base-component/base-component.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponentComponent implements OnInit, HttpSuccesFailureResponse {
  public userSearchQuery: string;
  public userSearchList: UserBasic[];
  public userId: number;
  public userData: any;
  public userProfile: string;
  profileName = '';
  public HeaderLoader: boolean = false;
  @ViewChild('searchTypehead') emailRef: ElementRef;
  search: string;   // text to search (email)

  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private httpUserUtilsService: HttpUserUtilsService, private router: Router, private shareDataSubscriptionService: ShareDataSubscriptionService, private loaderService: LoaderComponentService) {
    super();
  }

  ngAfterViewInit() {

    $('#notifications ,.slideUp').click(function () {
      $('.followingYou').slideToggle('slow');
      $('.text').remove();
    });

 

    $(document).mouseup(function (e) {
      if (e.target.offsetParent && e.target.offsetParent.id.indexOf('notification_popup') == -1 && e.target.offsetParent.id != 'notifications') {
        $('.followingYou').slideUp('slow');
      }
       });
  }

  ngOnInit() {
    this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        if (state.loaderClass == "loaderSearch") {
          this.HeaderLoader = true;
        } else {
          this.HeaderLoader = false;
        }
      });

    this.userId = StorageService.getUserId();
    this.userData = StorageService.getUser();
    this.userProfile = (this.userData.profileImage) ? this.userData.profileImage.thumbnailPath : "";
    this.profileName = this.userData.name;
    console.log(this.userProfile);
    this.shareDataSubscriptionService.refreshUserProfileState.subscribe(userData => {

      this.userData = userData;
      this.userProfile = (this.userData.profileImage) ? this.userData.profileImage.thumbnailPath : "";
      this.profileName = userData.name;




    });
    Observable.fromEvent(this.emailRef.nativeElement, 'keyup')
    .map((evt: any) => evt.target.value)
    .debounceTime(200)        
    .distinctUntilChanged()
    .subscribe((text: string) => this.userSearch(text));

    
    this.router.events.subscribe((event: RouterEvent) => {
     // $('.followingYou').slideUp('slow');

          if(event.url&&event.url.indexOf('newsfeed')>-1){
            $('.activeBtn1').removeClass('activeBtnBorder');
            $('.activeBtn').addClass('activeBtnBorder');
            } 
            else if(event.url&&event.url.indexOf('explore')>-1){
              $('.activeBtn').removeClass('activeBtnBorder');
              $('.activeBtn1').addClass('activeBtnBorder');
              } 
              else{
                $('.activeBtn1').removeClass('activeBtnBorder');
                $('.activeBtn').removeClass('activeBtnBorder');

              }     

    })
  }

  onSuccess(type: any, responseData: any[]) {
    this.userSearchList = responseData;

      $('.exploreSearch').slideDown('slow');
   
  }

  onFailure(type: any, response: string) {
    this.showAlertMessage("Error", "", response, 2000)
  }

  userSearch(query: string) {
  if (query) {
      const typeAheadUserRequest = new TypeAheadRequest();
      typeAheadUserRequest.type = 'user';
      typeAheadUserRequest.page = 0;
      typeAheadUserRequest.size = 100;
      typeAheadUserRequest.query = query;
      this.httpUserUtilsService.getUserSearchTypeAhead(typeAheadUserRequest, this, true);
    }else{
      $('.exploreSearch').slideUp('slow');
 
    }
  }
  logOutUser() {
    this.httpUserUtilsService.logoutuser(this.router,localStorage.getItem("localeId"));
  }
  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
  }

  showinProgressAlert() {
    let conFirmationPopup;
    conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.message = MessagesConstants.chatInProgressAlert;
    conFirmationPopup.componentInstance.confirmText = "Close";
    conFirmationPopup.componentInstance.showCancel = false;
    conFirmationPopup.componentInstance.title = MessagesConstants.chatInProgressTitle;


  }
  routeUser(route, id?: any) {
    if (id) {
      UtitlityService.redirectUser(this.router, route, id);
      return
    }
    UtitlityService.redirectUser(this.router, route);
  }
  routeExplore(exploreFor) {
    UtitlityService.redirectTo(this.router, "/explore?for=" + exploreFor);
  }
  public setLanguage = (language) => {
    localStorage.setItem('localeId', language);
    console.log('locale set to:'+language);
    location.reload(true);      
}
   
}
