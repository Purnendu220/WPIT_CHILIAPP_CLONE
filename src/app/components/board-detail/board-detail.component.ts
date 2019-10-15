import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { StorageService } from '../../core/storage-service.service';
import { Board } from '../../httpWrapperModule/responseModels/userProfileResponse';
import { HttpMidlUtilService } from '../../httpWrapperModule/http_midl_util.service';
import { UrlResponseCodes, InfiniteScroll } from '../../core/constants';
import { Router } from '@angular/router';
import { PaginationDto } from '../../core/model/paginationDto';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

  activeTab: string;
  boardId: number;
  boardMediaTypes: any[];
  boardMedia: any[] = [];
  activeMediaType: string = "";
  pagination: PaginationDto = new PaginationDto();
  activeUserId: number = StorageService.getUserId();
  userId: number;
  boardNmae:string='';


  public throttle = InfiniteScroll.throttle;
  public scrollDistance = InfiniteScroll.scrollDistance;
  public scrollUpDistance = InfiniteScroll.scrollUpDistance;

  constructor(public Browserlocation: PlatformLocation,public activeModal: NgbActiveModal, private httpMidl: HttpMidlUtilService, private router: Router) {
    Browserlocation.onPopState(() => {
      this.activeModal.close('Close Model');
  });
   }

  ngOnInit() {
    this.activeTab = "post";
  }
  onTabChange(tab) {
    this.activeTab = tab;
    if (tab == 'files') {
      this.httpMidl.getBoardMediaType(this.boardId, this, true);
      this.getFileList("ALL");
    }
  }
  getFileList(mediaType) {
    this.boardMedia = [];
    this.activeMediaType = mediaType;
    this.httpMidl.getBoardMedia(this.boardId, this.activeMediaType, this.pagination.createPaginatedUri(), this, true);
  }
  navigateToCreatePost() {
    this.activeModal.close('close');
    this.router.navigateByUrl("user/" + StorageService.getUserId());
  }

  onScrollDown() {
    if (!this.pagination.stopPagination && this.activeTab == "files") {
      this.pagination.page = this.pagination.page + 1;
      this.httpMidl.getBoardMedia(this.boardId, this.activeMediaType, this.pagination.createPaginatedUri(), this, true);
    }
  }

  onScrollUp() {
  }

  onSuccess(type: any, responseData: any, successId: number) {
    switch (type) {
      case UrlResponseCodes.boardMediaTypes:
        this.boardMediaTypes = responseData;
        break;
      case UrlResponseCodes.boardMedia:
        if (responseData.length <= 0) {
          this.pagination.stopPagination = true;
        }
        this.boardMedia.push.apply(this.boardMedia, responseData);
    }
  }

  onFailure(type: any, response: string, failedId: number) {
    switch (type) {
      case UrlResponseCodes.boardMediaTypes:
        break;
      case UrlResponseCodes.boardMedia:
        break;
    }
  }
}
