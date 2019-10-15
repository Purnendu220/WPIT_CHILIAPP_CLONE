import { StorageService } from './../core/storage-service.service';
import { UrlConstants, UrlResponseCodes } from './../core/constants';
import { Injectable } from '@angular/core';
import { HttpWrapper } from './http-wrapper';
import { HttpSuccesFailureResponse } from './http_wrapper_response.intreface';
import { Constants } from '../core/constants';
import { UtitlityService } from '../core/utils.service';
import { ApiResponseModel } from '../core/model/apiResponse.model';
import { URLSearchParams } from '@angular/http';
import { BoardRequestDto } from '../core/model/board-request-dto.model';
import { ExplorerRequestModel } from '../core/model/explorerrequest.model';
import { User } from '../core/model/user.model';
import { FollowRequestModel } from '../core/model/followRequestModel';
import { TypeAheadRequest } from '../core/model/type-ahead-request.model';
import { Router } from '@angular/router/src/router';
import { ChangePasswordRequestDto } from '../core/model/changepassword-request-dto.model';

@Injectable()
export class HttpUserUtilsService {


  constructor(private myHttp: HttpWrapper) {
    try {
      myHttp.setHeader(Constants.authToken, StorageService.getToken());

    } catch (e) {
      console.log(e);
    }
    // myHttp.setHeader('appVersion', Constants.appVersion);
  }

  modelToQueryString(object: any) {
    const params = new URLSearchParams();
    for (const key in object) {
      params.set(key, object[key]);
    }
    return params.toString() + '&debug=true';
  }

  getUserData(userId: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.get<ApiResponseModel>(UrlConstants.user + '/' + userId, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getUserCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getUserCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  login(username, password, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = { username: username, password: password, deviceType: 'web' };
    this.myHttp.post<ApiResponseModel>(UrlConstants.userLoginApi, showLoader, body).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          StorageService.setUser(data.data);
          callback.onSuccess(UrlResponseCodes.loginUserCode, data.data);
          this.myHttp.setHeader(Constants.authToken, StorageService.getToken());

        }
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.loginUserCode, this.myHttp.handleApiErrorResponse(error));
      });

  }

  signup(userTypeId, universityId, name, username, email, password, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {
      userTypeId: userTypeId,
      universityId: universityId,
      name: name,
      username: username,
      email: email,
      password: password,
      deviceType: 'web'
    };
    this.myHttp.post<ApiResponseModel>(UrlConstants.userSignupApi, showLoader, body).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.signupUserCode, data);
        }
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.signupUserCode, this.myHttp.handleApiErrorResponse(error));
      });

  }

  searchExistingFile(callback: HttpSuccesFailureResponse, showLoader: boolean, term?: any) {
    let url;
    if (term) {
      url = UrlConstants.searchBoardMediaUrl + '?mediaName=' + term + '&userId=' + StorageService.getUserId();
    } else {
      url = UrlConstants.searchBoardMediaUrl + '?mediaName=&userId=' + StorageService.getUserId();
    }
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardMediaUrlCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardMediaUrlCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  getBoardList(callback: HttpSuccesFailureResponse, boolean, showLoader: boolean, term?: any) {
    const url = UrlConstants.userBoardListUrl + '?isArchived=' + boolean + '&userId=' + StorageService.getUserId();
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userBoardListResponseCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userBoardListResponseCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  postNews(newsText, boardIds, isPublish, masterPostTypeId, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {
      userId: StorageService.getUserId(),
      newsText: newsText,
      boardIds: boardIds,
      isPublish: isPublish,
      masterPostTypeId: masterPostTypeId
    };
    this.myHttp.post<ApiResponseModel>(UrlConstants.postNewsApiUrl, showLoader, body).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.postNewsResponseCode, data.data);
        }
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.postNewsResponseCode, this.myHttp.handleApiErrorResponse(error));
      });

  }

  publishNews(newsPostId, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.post<ApiResponseModel>(UrlConstants.postNewsApiUrl + '/' + newsPostId + '/publish', showLoader,
      { newspostId: newsPostId }).subscribe(
      data => {
        if (data.statusCode === Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.publishNewsResponseCode, data.data);
        }

      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.publishNewsResponseCode, this.myHttp.handleApiErrorResponse(error));
      });

  }

  uploadMedia(id: any, mediaFor: string, objectType: string, mediaName: any,
    fileList: any[], mediaType: any, callback: HttpSuccesFailureResponse,
    showLoader: boolean) {
    fileList.forEach(element => {
      const formData = new FormData();
      formData.append('media', element);
      formData.append('mediaFor', mediaFor);
      formData.append('mediaName', mediaName);
      formData.append('mediaType', mediaType);
      formData.append('objectDataId', id);
      formData.append('objectType', objectType);
      this.myHttp.post<ApiResponseModel>(UrlConstants.mediaUploadApi + '?debug=true', showLoader, formData).subscribe(
        data => {
          if (data.statusCode === Constants.responseSuccess) {
            callback.onSuccess(UrlResponseCodes.fileUploadResponse, data);
          }
        },
        error => {
          this.myHttp.hideLoader();
          const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
          callback.onFailure(UrlResponseCodes.fileUploadResponse, errorMessage);

        });
    });
  }

  uploadMediaJS(objectDataId, mediaFor, ObjectType, mediaType, dataList: any[], extension, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    dataList.forEach(element => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST',
        UrlConstants.mediaUploadApi.concat('?binaryMode=true&mediaName=' + new Date().getTime() + extension +
          '&objectType=' + ObjectType + '&mediaFor=' + mediaFor + '&mediaType=' + mediaType + '&objectDataId=' +
          objectDataId + '&debug=true'), true);
      xhr.setRequestHeader(Constants.authToken, StorageService.getToken());
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      this.myHttp.showLoader();
      xhr.send(element.fileBlob);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.myHttp.hideLoader();
          if (xhr.status === 200) {
            callback.onSuccess(UrlResponseCodes.fileUploadResponse, JSON.parse(xhr.response));
          } else {
            const response = UtitlityService.getObjectFromJson<ApiResponseModel>(xhr.response);
            callback.onFailure(UrlResponseCodes.fileUploadResponse, response.errorMessage);
          }
        }
      };
    });

  }

  putUserData(user: User, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.put<ApiResponseModel>(UrlConstants.user + '/' + user.id, showLoader, user).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.putUserCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.putUserCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  patchUserData(user: any, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.patch<ApiResponseModel>(UrlConstants.user + '/' + user.id, showLoader, user).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.putUserCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.putUserCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  blockUnblockUser(userId: number, isBlocked: boolean, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.post<ApiResponseModel>(UrlConstants.blockOrUnblockUser + '/' + userId + '?blockToggle=' + isBlocked, showLoader, {}).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.blockOrUnblockUserCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.blockOrUnblockUserCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  changePassword(changePasswordRequestDto: ChangePasswordRequestDto, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.post<ApiResponseModel>(UrlConstants.userChangePassword + '?debug=true', showLoader, changePasswordRequestDto).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userChangePasswordCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userChangePasswordCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  notification(userId, pagenumber, notificationCategory, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    // tslint:disable-next-line:max-line-length
    let ResponseCode;
    // tslint:disable-next-line:max-line-length
    this.myHttp.get<any>(UrlConstants.usernotification.concat('?userId=' + userId + '&page=' + pagenumber + '&size=' + Constants.pageSize + '&notificationCategory=' + notificationCategory), showLoader).subscribe(
      data => {
        ResponseCode = (notificationCategory == 'you') ? UrlResponseCodes.notificationsYouType : UrlResponseCodes.notificationsFollowingType;
        callback.onSuccess(ResponseCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(ResponseCode, this.myHttp.handleApiErrorResponse(error));
      }
    )
  }

  newboardrequest(userId: number, pagenumber: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.get<any>(UrlConstants.newBoardRequest.concat('?userId=' + userId + '&page=' + pagenumber + '&size=' + Constants.pageSize + '&debug=true'), showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.NewBoardRequest, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.NewBoardRequest, this.myHttp.handleApiErrorResponse(error));
      }
    )
  }

  acceptOrReject(joinRequestObj: any, isJoined: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let data = { "boardId": joinRequestObj.boardId, "joinedBy": joinRequestObj.joinedBy, "isJoined": isJoined };
    this.myHttp.put<any>(UrlConstants.board + "/join", showLoader, data).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.joinrequestAccept, data.data, joinRequestObj);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.joinrequestReject, this.myHttp.handleApiErrorResponse(error), joinRequestObj);
      }
    )
  }

  uploadExistingFile(existingMediaId, newsPostId, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = { existingMediaId: existingMediaId, objectDataId: newsPostId };
    this.myHttp.post<ApiResponseModel>(UrlConstants.existingMediaUploadApi, showLoader, body).subscribe(
      data => {
        if (data.statusCode == Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.existingMediaUploadCode, data.data);
        }

      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.existingMediaUploadCode, this.myHttp.handleApiErrorResponse(error));
      });

  }

  getUserExplorer(explorerRequestModel: ExplorerRequestModel,
    callback: HttpSuccesFailureResponse, showLoader: boolean, urlResponseCode: string) {
    let queryString: string;
    queryString = this.modelToQueryString(explorerRequestModel);

    this.myHttp.get<ApiResponseModel>(UrlConstants.explorerAPI + queryString, showLoader).subscribe(
      data => {
        callback.onSuccess(urlResponseCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(urlResponseCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  createBoard(boardRequestData: BoardRequestDto, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {
      name: boardRequestData.name,
      isPrivate: boardRequestData.isPrivate,
      userId: boardRequestData.userId,
      deviceType: 'web'
    };
    this.myHttp.post<ApiResponseModel>(UrlConstants.board, showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardPostCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardPostCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  updateBoard(boardRequestData: BoardRequestDto, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {
      name: boardRequestData.name,
      isPrivate: boardRequestData.isPrivate,
      userId: boardRequestData.userId,
      deviceType: 'web'
    };
    this.myHttp.put<ApiResponseModel>(UrlConstants.board + '/' + boardRequestData.id, showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardPutCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardPutCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  deleteBoard(boardId: number, userId: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {};
    let urlstr = UrlConstants.board + '?id=' + boardId + '&userId=' + userId;
    this.myHttp.delete<ApiResponseModel>(urlstr, showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardDeleteCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardDeleteCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  archiveBoard(boardId: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {};
    let urlstr = UrlConstants.archiveBoard + '/' + boardId;
    this.myHttp.post<ApiResponseModel>(urlstr, showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardArchiveCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardArchiveCode, this.myHttp.handleApiErrorResponse(error));
      });
  }
  profileBoard(boardId: number, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const body = {};
    let urlstr = UrlConstants.profileBoard + '/' + boardId;
    this.myHttp.post<ApiResponseModel>(urlstr, showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.boardProfileCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.boardProfileCode, this.myHttp.handleApiErrorResponse(error));
      });
  }


  getJoinedBoard(userId: number, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.board + '/joined?userId=' + userId;
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getJoinedBoardListCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getJoinedBoardListCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  getFollowerFollowing(userId: number, dataFor: string, pagination: string, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.user + '/follow';
    let urlresponseCode = '';
    if (dataFor == 'following') {
      url = url + '?followerUserId=' + userId;
      urlresponseCode = UrlResponseCodes.getFollowingCode;
    } else if (dataFor == 'follower') {
      url = url + '?followedUserId=' + userId;
      urlresponseCode = UrlResponseCodes.getFollowerCode;
    }
    url = url + '&' + pagination;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(urlresponseCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(urlresponseCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  postFollowToggle(followRequestModel: FollowRequestModel, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let body = followRequestModel;
    this.myHttp.post<ApiResponseModel>(UrlConstants.user + '/follow', showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.postFollowTogggleCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.postFollowTogggleCode, this.myHttp.handleApiErrorResponse(error), followRequestModel);
      });
  }

  getDepartments(query: String, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let url = UrlConstants.departmentListUrl + "&query=" + query+"&size=50000";
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getDepList, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getDepList, this.myHttp.handleApiErrorResponse(error));
      });
  }

  postBlockToggle(blockedUserId, blockToggle, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let body = {};
    this.myHttp.post<ApiResponseModel>(UrlConstants.user + '/block/' + blockedUserId + '?blockToggle=' + blockToggle, showLoader, body).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.postBlockTogggleCode, data.data, blockedUserId);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.postBlockTogggleCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  userHashTag(query, page, callback: HttpSuccesFailureResponse, showLoader: boolean, term?: any) {
    const url = UrlConstants.userTaggingUrl + '?type=hashTag' + '&query=' + query + '&page=' + page + '&siza=' + Constants.pageSize;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userTaggingResponseCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userTaggingResponseCode, this.myHttp.handleApiErrorResponse(error));
      });
  }
  userMention(query, page, callback: HttpSuccesFailureResponse, showLoader: boolean, term?: any) {
    const url = UrlConstants.userMentionUrl + '?query=' + query + '&page=' + page + '&siza=' + Constants.pageSize;
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userMentionResponseCode, data.data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userMentionResponseCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  getUserSearchTypeAhead(typeAheadRequest: TypeAheadRequest, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    let queryString: string;
    queryString = this.modelToQueryString(typeAheadRequest);
    this.myHttp.get<ApiResponseModel>(UrlConstants.userSearchTypeAHead + queryString, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getUserSearchCode, data.data);

      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getUserSearchCode, error);
      });

  }

  getBlockedUserList(callback: HttpSuccesFailureResponse, showLoader: boolean, term?: any) {
    const url = UrlConstants.user + '/blocked-users';
    this.myHttp.get<ApiResponseModel>(url, showLoader).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.getBlockedUsers, data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getBlockedUsers, this.myHttp.handleApiErrorResponse(error));
      });
  }

  forgotPassword(email, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const url = UrlConstants.userForgotPassword + '?usernameOrEmail=' + email;
    this.myHttp.post<ApiResponseModel>(url, showLoader, null).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userForgotPasswordCode, data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userForgotPasswordCode, this.myHttp.handleApiErrorResponse(error));
      });

  }


  logoutuser(router: Router, language) {
    let body = { "userId": StorageService.getUserId() };
    this.myHttp.post<any>(UrlConstants.userLogut, false, body).subscribe(
      data => {
        this.myHttp.setHeader(Constants.authToken, null);
        localStorage.clear();
        UtitlityService.redirectUser(router, '')
        StorageService.setDefaultLanguage(language);

      },
      error => {
        this.myHttp.hideLoader();
        this.myHttp.setHeader(Constants.authToken, null);
        localStorage.clear()
        UtitlityService.redirectUser(router, '')
        StorageService.setDefaultLanguage(language);



      });
  }
  contactUs(contactUs, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const formData = new FormData();
    formData.append('name', contactUs.name);
    formData.append('email', contactUs.email);
    formData.append('subject', contactUs.subject);
    formData.append('message', contactUs.message);
    this.myHttp.removeHeader(Constants.authToken);
    this.myHttp.post<ApiResponseModel>("https://cms.myu.co/web/contact_us/mail_sender", showLoader, formData).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userChangePasswordCode, data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userChangePasswordCode, this.myHttp.handleApiErrorResponse(error));
      });
  }

  planLeadMail(leadData, callback: HttpSuccesFailureResponse, showLoader: boolean) {
    const formData = new FormData();
    formData.append('email', leadData.email);
    formData.append('school', leadData.school);
    formData.append('message', leadData.message);
    this.myHttp.removeHeader(Constants.authToken);
    this.myHttp.post<ApiResponseModel>("https://cms.myu.co/web/lead/mail_sender", showLoader, formData).subscribe(
      data => {
        callback.onSuccess(UrlResponseCodes.userChangePasswordCode, data);
      },
      error => {
        this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.userChangePasswordCode, this.myHttp.handleApiErrorResponse(error));
      });
  }


}
