import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StorageService } from '../../core/storage-service.service';
import { User } from '../../core/model/user.model';
import { AppLogger } from '../../core/logger';
import { NewsType } from '../../core/constants';
import { NewsListComponent } from '../news-list/news-list.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  public userId: number;
  public userData: User;
  public otherUserProfileFlag: boolean;
  public type: string;
  @ViewChild('newsList') child: NewsListComponent;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      if (this.type) {
        this.child.refreshNewsList(this.userId);
      }
    });
    this.type = NewsType.newsFeed;
    this.userData = StorageService.getUser();
    this.otherUserProfileFlag = false;
  }
  ngAfterViewInit() {
    $('.autoSideBarLeft,.autoSideBarRight')
      .theiaStickySidebar({
        'additionalMarginTop': 90
      });
  }


}
