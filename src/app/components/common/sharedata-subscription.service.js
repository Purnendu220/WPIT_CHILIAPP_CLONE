"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var ShareDataSubscriptionService = /** @class */ (function () {
    function ShareDataSubscriptionService() {
        // Sharing data with board list after create board
        this.boardDataSource = new Subject_1.Subject();
        this.boardData = this.boardDataSource.asObservable();
        this.newsPostSource = new Subject_1.Subject();
        this.newsPost = this.newsPostSource.asObservable();
        this.newsPublishSuccess = new Subject_1.Subject();
        this.newsPublish = this.newsPublishSuccess.asObservable();
        this.newsPublishAddNews = new Subject_1.Subject();
        this.newsAddNews = this.newsPublishAddNews.asObservable();
        // Sharing data after following count change
        this.followingCountSource = new Subject_1.Subject();
        this.followingCount = this.followingCountSource.asObservable();
        this.postCountDataSource = new Subject_1.Subject();
        this.postCount = this.postCountDataSource.asObservable();
        this.newsDataSource = new Subject_1.Subject();
        this.newsData = this.newsDataSource.asObservable();
        this.alertSubject = new Subject_1.Subject();
        this.alertState = this.alertSubject.asObservable();
        this.refreshUserProfileSubject = new Subject_1.Subject();
        this.refreshUserProfileState = this.refreshUserProfileSubject.asObservable();
    }
    ShareDataSubscriptionService.prototype.boardDataChange = function (board) {
        this.boardDataSource.next(board);
    };
    ShareDataSubscriptionService.prototype.refreshUserData = function (userData) {
        this.refreshUserProfileSubject.next(userData);
    };
    ShareDataSubscriptionService.prototype.postNews = function (selectedBoardsDetails) {
        this.newsPostSource.next(selectedBoardsDetails);
    };
    ShareDataSubscriptionService.prototype.newsPublished = function (newsList) {
        this.newsPublishSuccess.next(newsList);
    };
    ShareDataSubscriptionService.prototype.newsPublishedAddNews = function (newsList) {
        this.newsPublishAddNews.next(newsList);
    };
    ShareDataSubscriptionService.prototype.followingCountChange = function (action) {
        this.followingCountSource.next(action);
    };
    ShareDataSubscriptionService.prototype.postCountChange = function (action) {
        this.postCountDataSource.next(action);
    };
    ShareDataSubscriptionService.prototype.newsDataChange = function (news) {
        this.newsDataSource.next(news);
    };
    ShareDataSubscriptionService.prototype.show = function (type, statusCode, statusMessage, alertTime) {
        if (alertTime) {
            this.alertSubject.next({ "alertType": type, "statusCode": statusCode, "statusMessage": statusMessage, "alertTime": alertTime });
        }
        else {
            this.alertSubject.next({ "alertType": type, "statusCode": statusCode, "statusMessage": statusMessage });
        }
    };
    ShareDataSubscriptionService = __decorate([
        core_1.Injectable()
    ], ShareDataSubscriptionService);
    return ShareDataSubscriptionService;
}());
exports.ShareDataSubscriptionService = ShareDataSubscriptionService;
