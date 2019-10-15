import { concat } from 'rxjs/observable/concat';
import { HttpUserUtilsService } from './httpWrapperModule/http_user_util.service';
import { StorageService } from './core/storage-service.service';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoaderComponentService } from './components/common/loader/loader.service';
import { environment } from '../environments/environment';
import { HttpSuccesFailureResponse } from './httpWrapperModule/http_wrapper_response.intreface';
import { UrlResponseCodes, MessagesConstants } from './core/constants';
import { ShareDataSubscriptionService } from './components/common/sharedata-subscription.service';
import { window } from 'rxjs/operator/window';
import { APP_BASE_HREF } from '@angular/common';
import { LoaderState } from './components/common/loader/loader';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, HttpSuccesFailureResponse {

  public showMainLoader: boolean;
  public wShowHeaderFooter: boolean = false;
  public userId: any;
  public isCookiesDisabled: boolean = false;


  constructor( @Inject(LOCALE_ID) locale: string, private httpUserUtilsService: HttpUserUtilsService, @Inject(APP_BASE_HREF) private baseHref: string, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private loaderService: LoaderComponentService,
    private sharedDataSubsriptionService: ShareDataSubscriptionService, @Inject(DOCUMENT) private document: any) {
    try {
      this.wShowHeaderFooter = StorageService.getIsLoggedIn();
    }
    catch (e) {
      this.isCookiesDisabled = true;
    }

  }
  ngOnInit() {
    this.checkUserLanguage();
    this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        if (state.loaderClass == "loaderMain") {
          this.showMainLoader = true;
        } else {
          this.showMainLoader = false;
        }


      });
    try {
      if (StorageService.getIsLoggedIn()) {
        this.userId = StorageService.getUserId();
        this.httpUserUtilsService.getUserData(this.userId, this, false);
      }
      this.wShowHeaderFooter = StorageService.getIsLoggedIn();
    }
    catch (e) {
      console.log(e);
    }

    this.router.events.subscribe((event: RouterEvent) => {
      if (event['title']) {
        this.titleService.setTitle(event['title']);
      }
      this.navigationInterceptor(event)
      try {
        this.wShowHeaderFooter = StorageService.getIsLoggedIn();
      }
      catch (e) {
        console.log(e);
      }

    })
    if (this.isCookiesDisabled) {
      alert(MessagesConstants.CookiesDisabled);
    }

  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.show();

    }
    if (event instanceof NavigationEnd) {
      this.loaderService.hide();

    }
    if (event instanceof NavigationCancel) {
      this.loaderService.hide();
    }
    if (event instanceof NavigationError) {
      this.loaderService.hide();
    }
  }
  checkUserLanguage() {
    if ((!environment.defaultLanguageLookup) || StorageService.getDefaultLanguage() == environment.language) {
      return;
    }
    if (StorageService.getDefaultLanguage() == 'ar') {
      this.document.location.href = this.document.location.origin + '/ar' + this.document.location.pathname;
    }
  }

  onSuccess(type: any, responsedata: any, successId?: number) {
    switch (type) {
      case UrlResponseCodes.getUserCode:
        StorageService.setUser(responsedata);
        this.sharedDataSubsriptionService.refreshUserData(StorageService.getUser());
        break;
    }
  }
  onFailure(type: any, response: string, failedId?: any) {
    switch (type) {
      case UrlResponseCodes.getUserCode:
        break;
    }
  }
}
