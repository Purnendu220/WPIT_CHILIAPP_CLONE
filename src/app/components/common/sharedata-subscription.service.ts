import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {News} from '../../core/model/news-model';
import { AlertState } from './show-alert-toast/alert-state';

@Injectable()
export class ShareDataSubscriptionService {

  // Sharing data with board list after create board
  private boardDataSource = new Subject<any>();
  boardData = this.boardDataSource.asObservable();

  private newsPostSource = new Subject<any[]>();
  newsPost = this.newsPostSource.asObservable();

  private newsPublishSuccess = new Subject<any[]>();
  newsPublish = this.newsPublishSuccess.asObservable();

  private newsPublishAddNews = new Subject<any>();
  newsAddNews = this.newsPublishAddNews.asObservable();

  // Sharing data after following count change
  private followingCountSource = new Subject<string>();
  followingCount = this.followingCountSource.asObservable();

  private postCountDataSource = new Subject<number>();
  public postCount = this.postCountDataSource.asObservable();

  private newsDataSource = new Subject<any>();
  public newsData = this.newsDataSource.asObservable();

  private alertSubject = new Subject<AlertState>();
  alertState = this.alertSubject.asObservable();

  private refreshUserProfileSubject = new Subject<any>();
  refreshUserProfileState = this.refreshUserProfileSubject.asObservable();
  constructor() {
  }

  boardDataChange(board: any) {
    this.boardDataSource.next(board);
  }
  refreshUserData(userData: any) {
    this.refreshUserProfileSubject.next(userData);
  }

  postNews(selectedBoardsDetails: any) {
    this.newsPostSource.next(selectedBoardsDetails);
  }

  newsPublished(newsList: any[]) {
    this.newsPublishSuccess.next(newsList);
  }
  newsPublishedAddNews(newsList: any) {
    this.newsPublishAddNews.next(newsList);
  }
  
  followingCountChange(action: string) {
    this.followingCountSource.next(action);
  }

  postCountChange(action: number) {
    this.postCountDataSource.next(action);
  }

  newsDataChange(news: News) {
    this.newsDataSource.next(news);
  }
  show(type,statusCode,statusMessage,alertTime?:any) {
    if(alertTime){
      this.alertSubject.next(<AlertState>{"alertType":type,"statusCode": statusCode,"statusMessage":statusMessage,"alertTime":alertTime});
    }
    else{
      this.alertSubject.next(<AlertState>{"alertType":type,"statusCode": statusCode,"statusMessage":statusMessage});
    }
}
}
