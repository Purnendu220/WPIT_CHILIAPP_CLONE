import { UrlConstants, UrlResponseCodes } from './../core/constants';
import { Injectable } from '@angular/core';
import { HttpWrapper } from './http-wrapper';
import { HttpSuccesFailureResponse } from './http_wrapper_response.intreface';
import { Constants } from '../core/constants';
import { UtitlityService } from '../core/utils.service';
import { ApiResponseModel } from '../core/model/apiResponse.model';
import { StorageService } from '../core/storage-service.service';
import { NewsFeedRequest } from '../core/model/newsfeedrequest.model';
import { URLSearchParams } from '@angular/http';
import { NewsReportRequest } from '../core/model/newsreportrequest.model';

@Injectable()
export class HttpMidlUtilService {


  constructor(private myHttp: HttpWrapper) {
    myHttp.setHeader(Constants.authToken, StorageService.getToken());
  }

  getNewsFeedData(newsFeedRequestData: NewsFeedRequest, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let queryString: string;
    queryString = this.modelToQueryString(newsFeedRequestData);
    this.myHttp.get<ApiResponseModel>(UrlConstants.getNewsFeedList + queryString, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getNewsListCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getNewsListCode, UtitlityService.handleApiErrorResponse(error));
      });
  }

  deleteNews(virtualNewsId: number, deletedIndex: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const urlStr = UrlConstants.newsDelete + virtualNewsId;
    this.myHttp.delete<ApiResponseModel>(urlStr, showLoader, {}).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.newsDeleteCode, data.data, deletedIndex);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.newsDeleteCode, UtitlityService.handleApiErrorResponse(error));
      });
  }
  getNews(virtualNewsId: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const urlStr = UrlConstants.newsDelete + virtualNewsId;
    this.myHttp.get<any>(urlStr, showLoader, {}).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getNewsCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getNewsCode, UtitlityService.handleApiErrorResponse(error));
      });
  }

  reportNews(newsReportRequest: NewsReportRequest, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.post<ApiResponseModel>(UrlConstants.newsReport, showLoader, newsReportRequest).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.newsReportCode, data.data);
        }
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.newsReportCode, UtitlityService.handleApiErrorResponse(error));
      });

  }

  getNewsCommentData(newsCommentRequestData: Object, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let queryString: string;
    queryString = this.modelToQueryString(newsCommentRequestData);
    this.myHttp.get<ApiResponseModel>(UrlConstants.getNewsCommentList + queryString, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getNewsCommentListCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getNewsCommentListCode, UtitlityService.handleApiErrorResponse(error));
      });
  }

  postNewsComment(newsPostCommentRequest: FormData, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.post<ApiResponseModel>(UrlConstants.postNewsCommentList, showLoader, newsPostCommentRequest).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.postNewsCommentCode, data.data);
        } else {
          callback.onFailure(UrlResponseCodes.postNewsCommentCode, data.statusCode);
        }
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.postNewsCommentCode, UtitlityService.handleApiErrorResponse(error));
      });

  }

  deleteNewsComment(id: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const urlStr = UrlConstants.newsCommentDelete + id;
    this.myHttp.delete<ApiResponseModel>(urlStr, showLoader, {}).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.newsCommentDeleteCode, data.data, id);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.newsCommentDeleteCode, UtitlityService.handleApiErrorResponse(error));
      });
  }

  newsLikeUnlike(newsLikeUnlikeObj: Object, callback: HttpSuccesFailureResponse, showLoader: boolean) {

    let queryString: string;
    queryString = this.modelToQueryString(newsLikeUnlikeObj);
    this.myHttp.post<ApiResponseModel>(UrlConstants.newsLikeUnlike + queryString, showLoader, {}).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.newsLikeUnLikeCode, data.data);
        }
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.newsLikeUnLikeCode,
          UtitlityService.handleApiErrorResponse(error),
          newsLikeUnlikeObj['virtualNewsId']);
      });
  }


  joinBoard(requestBody: any, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.post<ApiResponseModel>(UrlConstants.board + '/join', showLoader, requestBody).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardJoinCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardJoinCode, UtitlityService.handleApiErrorResponse(error), requestBody.boardId);
      });
  }

  unjoinBoard(requestBody: any, callback: HttpSuccesFailureResponse, showLoader: boolean) {

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', UrlConstants.board + '/join?debug=true');
    xhr.setRequestHeader(Constants.authToken, StorageService.getToken());
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.myHttp.showLoader();
    requestBody.isJoined = 0;
    var json = JSON.stringify(requestBody);
    xhr.send(json);    
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.myHttp.hideLoader();
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.response);
          callback.onSuccess(UrlResponseCodes.boardUnjoinCode, data.data);
        } else {
          this.myHttp.hideLoader();
          const response = UtitlityService.getObjectFromJson<ApiResponseModel>(xhr.response);
          callback.onFailure(UrlResponseCodes.fileUploadResponse, response.errorMessage);
          callback.onFailure(UrlResponseCodes.boardUnjoinCode, response.errorMessage, requestBody.boardId);
        }
      }
    };

  }

  getNewsLikeUserList(virtualNewsId: number, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.newsLikesUserList + '?virtualNewsId=' + virtualNewsId;
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.newsLikesUserListCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.newsLikesUserListCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  getNewsViewUserList(virtualNewsId: number, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.newsViewsUserList + '?virtualNewsId=' + virtualNewsId;
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.newsViewsUserListCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.newsViewsUserListCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  getHashTagNewsList(hashText: number, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.hashTagNewsList + '?hashText=' + hashText;
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.hashTagNewsListCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.hashTagNewsListCode, this.myHttp.handleApiErrorResponse(error));
      });
  }
  
  getExploreNewsList(dataFromWiderWindow: boolean ,pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.exploreNewsList;
    url = url + '&' + pagination+'&dataFromWiderWindow='+dataFromWiderWindow;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.exploreNewsListCode, data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.exploreNewsListCode, this.myHttp.handleApiErrorResponse(error));
      });
  }


  getBoardMediaType(boardId, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.get<ApiResponseModel>(UrlConstants.board + "/findMediaType/" + boardId + "?debug=true", showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardMediaTypes, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardMediaTypes, this.myHttp.handleApiErrorResponse(error));
      });
  }

  getBoardMedia(boardId, mediaType, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.board + "/media?boardId=" + boardId + (mediaType != "ALL" ? "&mediaType=" + mediaType : "");
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardMedia, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardMedia, this.myHttp.handleApiErrorResponse(error));
      });
  }
  getBoardmembers(boardId: number, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.board + "/member" + '?boardId=' + boardId;
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardMember, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardMember, this.myHttp.handleApiErrorResponse(error));
      });
  }



  modelToQueryString(object: any) {
    const params = new URLSearchParams();
    for (const key in object) {
      params.set(key, object[key]);
    }
    return params.toString() + '&debug=true';
  }


}
