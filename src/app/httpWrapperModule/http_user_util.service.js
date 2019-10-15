"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var storage_service_service_1 = require("./../core/storage-service.service");
var constants_1 = require("./../core/constants");
var core_1 = require("@angular/core");
var constants_2 = require("../core/constants");
var utils_service_1 = require("../core/utils.service");
var http_1 = require("@angular/http");
var HttpUserUtilsService = /** @class */ (function () {
    function HttpUserUtilsService(myHttp) {
        this.myHttp = myHttp;
        try {
            myHttp.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
        }
        catch (e) {
            console.log(e);
        }
        // myHttp.setHeader('appVersion', Constants.appVersion);
    }
    HttpUserUtilsService.prototype.modelToQueryString = function (object) {
        var params = new http_1.URLSearchParams();
        for (var key in object) {
            params.set(key, object[key]);
        }
        return params.toString() + '&debug=true';
    };
    HttpUserUtilsService.prototype.getUserData = function (userId, callback, showLoader) {
        var _this = this;
        this.myHttp.get(constants_1.UrlConstants.user + '/' + userId, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.getUserCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.getUserCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.login = function (username, password, callback, showLoader) {
        var _this = this;
        var body = { username: username, password: password, deviceType: 'web' };
        this.myHttp.post(constants_1.UrlConstants.userLoginApi, showLoader, body).subscribe(function (data) {
            if (data.statusCode === constants_2.Constants.responseSuccess) {
                storage_service_service_1.StorageService.setUser(data.data);
                callback.onSuccess(constants_1.UrlResponseCodes.loginUserCode, data.data);
                _this.myHttp.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
            }
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.loginUserCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.signup = function (userTypeId, universityId, name, username, email, password, callback, showLoader) {
        var _this = this;
        var body = {
            userTypeId: userTypeId,
            universityId: universityId,
            name: name,
            username: username,
            email: email,
            password: password,
            deviceType: 'web'
        };
        this.myHttp.post(constants_1.UrlConstants.userSignupApi, showLoader, body).subscribe(function (data) {
            if (data.statusCode === constants_2.Constants.responseSuccess) {
                callback.onSuccess(constants_1.UrlResponseCodes.signupUserCode, data);
            }
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.signupUserCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.searchExistingFile = function (callback, showLoader, term) {
        var _this = this;
        var url;
        if (term) {
            url = constants_1.UrlConstants.searchBoardMediaUrl + '?mediaName=' + term + '&userId=' + storage_service_service_1.StorageService.getUserId();
        }
        else {
            url = constants_1.UrlConstants.searchBoardMediaUrl + '?mediaName=&userId=' + storage_service_service_1.StorageService.getUserId();
        }
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.boardMediaUrlCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.boardMediaUrlCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.getBoardList = function (callback, boolean, showLoader, term) {
        var _this = this;
        var url = constants_1.UrlConstants.userBoardListUrl + '?isArchived=' + boolean + '&userId=' + storage_service_service_1.StorageService.getUserId();
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userBoardListResponseCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userBoardListResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.postNews = function (newsText, boardIds, isPublish, masterPostTypeId, callback, showLoader) {
        var _this = this;
        var body = {
            userId: storage_service_service_1.StorageService.getUserId(),
            newsText: newsText,
            boardIds: boardIds,
            isPublish: isPublish,
            masterPostTypeId: masterPostTypeId
        };
        this.myHttp.post(constants_1.UrlConstants.postNewsApiUrl, showLoader, body).subscribe(function (data) {
            if (data.statusCode === constants_2.Constants.responseSuccess) {
                callback.onSuccess(constants_1.UrlResponseCodes.postNewsResponseCode, data.data);
            }
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.postNewsResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.publishNews = function (newsPostId, callback, showLoader) {
        var _this = this;
        this.myHttp.post(constants_1.UrlConstants.postNewsApiUrl + '/' + newsPostId + '/publish', showLoader, { newspostId: newsPostId }).subscribe(function (data) {
            if (data.statusCode === constants_2.Constants.responseSuccess) {
                callback.onSuccess(constants_1.UrlResponseCodes.publishNewsResponseCode, data.data);
            }
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.publishNewsResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.uploadMedia = function (id, mediaFor, objectType, mediaName, fileList, mediaType, callback, showLoader) {
        var _this = this;
        fileList.forEach(function (element) {
            var formData = new FormData();
            formData.append('media', element);
            formData.append('mediaFor', mediaFor);
            formData.append('mediaName', mediaName);
            formData.append('mediaType', mediaType);
            formData.append('objectDataId', id);
            formData.append('objectType', objectType);
            _this.myHttp.post(constants_1.UrlConstants.mediaUploadApi + '?debug=true', showLoader, formData).subscribe(function (data) {
                if (data.statusCode === constants_2.Constants.responseSuccess) {
                    callback.onSuccess(constants_1.UrlResponseCodes.fileUploadResponse, data);
                }
            }, function (error) {
                _this.myHttp.hideLoader();
                var errorMessage = _this.myHttp.handleApiErrorResponse(error);
                callback.onFailure(constants_1.UrlResponseCodes.fileUploadResponse, errorMessage);
            });
        });
    };
    HttpUserUtilsService.prototype.uploadMediaJS = function (objectDataId, mediaFor, ObjectType, mediaType, dataList, extension, callback, showLoader) {
        var _this = this;
        dataList.forEach(function (element) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', constants_1.UrlConstants.mediaUploadApi.concat('?binaryMode=true&mediaName=' + new Date().getTime() + extension +
                '&objectType=' + ObjectType + '&mediaFor=' + mediaFor + '&mediaType=' + mediaType + '&objectDataId=' +
                objectDataId + '&debug=true'), true);
            xhr.setRequestHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            _this.myHttp.showLoader();
            xhr.send(element.fileBlob);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    _this.myHttp.hideLoader();
                    if (xhr.status === 200) {
                        callback.onSuccess(constants_1.UrlResponseCodes.fileUploadResponse, JSON.parse(xhr.response));
                    }
                    else {
                        var response = utils_service_1.UtitlityService.getObjectFromJson(xhr.response);
                        callback.onFailure(constants_1.UrlResponseCodes.fileUploadResponse, response.errorMessage);
                    }
                }
            };
        });
    };
    HttpUserUtilsService.prototype.putUserData = function (user, callback, showLoader) {
        var _this = this;
        this.myHttp.put(constants_1.UrlConstants.user + '/' + user.id, showLoader, user).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.putUserCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.putUserCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.patchUserData = function (user, callback, showLoader) {
        var _this = this;
        this.myHttp.patch(constants_1.UrlConstants.user + '/' + user.id, showLoader, user).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.putUserCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.putUserCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.blockUnblockUser = function (userId, isBlocked, callback, showLoader) {
        var _this = this;
        this.myHttp.post(constants_1.UrlConstants.blockOrUnblockUser + '/' + userId + '?blockToggle=' + isBlocked, showLoader, {}).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.blockOrUnblockUserCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.blockOrUnblockUserCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.changePassword = function (changePasswordRequestDto, callback, showLoader) {
        var _this = this;
        this.myHttp.post(constants_1.UrlConstants.userChangePassword + '?debug=true', showLoader, changePasswordRequestDto).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userChangePasswordCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userChangePasswordCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.notification = function (userId, pagenumber, notificationCategory, callback, showLoader) {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var ResponseCode;
        // tslint:disable-next-line:max-line-length
        this.myHttp.get(constants_1.UrlConstants.usernotification.concat('?userId=' + userId + '&page=' + pagenumber + '&size=' + constants_2.Constants.pageSize + '&notificationCategory=' + notificationCategory), showLoader).subscribe(function (data) {
            ResponseCode = (notificationCategory == 'you') ? constants_1.UrlResponseCodes.notificationsYouType : constants_1.UrlResponseCodes.notificationsFollowingType;
            callback.onSuccess(ResponseCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(ResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.newboardrequest = function (userId, pagenumber, callback, showLoader) {
        var _this = this;
        this.myHttp.get(constants_1.UrlConstants.newBoardRequest.concat('?userId=' + userId + '&page=' + pagenumber + '&size=' + constants_2.Constants.pageSize + '&debug=true'), showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.NewBoardRequest, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.NewBoardRequest, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.acceptOrReject = function (joinRequestObj, isJoined, callback, showLoader) {
        var _this = this;
        var data = { "boardId": joinRequestObj.boardId, "joinedBy": joinRequestObj.joinedBy, "isJoined": isJoined };
        this.myHttp.put(constants_1.UrlConstants.board + "/join", showLoader, data).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.joinrequestAccept, data.data, joinRequestObj);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.joinrequestReject, _this.myHttp.handleApiErrorResponse(error), joinRequestObj);
        });
    };
    HttpUserUtilsService.prototype.uploadExistingFile = function (existingMediaId, newsPostId, callback, showLoader) {
        var _this = this;
        var body = { existingMediaId: existingMediaId, objectDataId: newsPostId };
        this.myHttp.post(constants_1.UrlConstants.existingMediaUploadApi, showLoader, body).subscribe(function (data) {
            if (data.statusCode == constants_2.Constants.responseSuccess) {
                callback.onSuccess(constants_1.UrlResponseCodes.existingMediaUploadCode, data.data);
            }
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.existingMediaUploadCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.getUserExplorer = function (explorerRequestModel, callback, showLoader, urlResponseCode) {
        var _this = this;
        var queryString;
        queryString = this.modelToQueryString(explorerRequestModel);
        this.myHttp.get(constants_1.UrlConstants.explorerAPI + queryString, showLoader).subscribe(function (data) {
            callback.onSuccess(urlResponseCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(urlResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.createBoard = function (boardRequestData, callback, showLoader) {
        var _this = this;
        var body = {
            name: boardRequestData.name,
            isPrivate: boardRequestData.isPrivate,
            userId: boardRequestData.userId,
            deviceType: 'web'
        };
        this.myHttp.post(constants_1.UrlConstants.board, showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.boardPostCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.boardPostCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.updateBoard = function (boardRequestData, callback, showLoader) {
        var _this = this;
        var body = {
            name: boardRequestData.name,
            isPrivate: boardRequestData.isPrivate,
            userId: boardRequestData.userId,
            deviceType: 'web'
        };
        this.myHttp.put(constants_1.UrlConstants.board + '/' + boardRequestData.id, showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.boardPutCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.boardPutCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.deleteBoard = function (boardId, userId, callback, showLoader) {
        var _this = this;
        var body = {};
        var urlstr = constants_1.UrlConstants.board + '?id=' + boardId + '&userId=' + userId;
        this.myHttp.delete(urlstr, showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.boardDeleteCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.boardDeleteCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.archiveBoard = function (boardId, callback, showLoader) {
        var _this = this;
        var body = {};
        var urlstr = constants_1.UrlConstants.archiveBoard + '/' + boardId;
        this.myHttp.post(urlstr, showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.boardArchiveCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.boardArchiveCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.profileBoard = function (boardId, callback, showLoader) {
        var _this = this;
        var body = {};
        var urlstr = constants_1.UrlConstants.profileBoard + '/' + boardId;
        this.myHttp.post(urlstr, showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.boardProfileCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.boardProfileCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.getJoinedBoard = function (userId, pagination, callback, showLoader) {
        var _this = this;
        var url = constants_1.UrlConstants.board + '/joined?userId=' + userId;
        url = url + '&' + pagination;
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.getJoinedBoardListCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.getJoinedBoardListCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.getFollowerFollowing = function (userId, dataFor, pagination, callback, showLoader) {
        var _this = this;
        var url = constants_1.UrlConstants.user + '/follow';
        var urlresponseCode = '';
        if (dataFor == 'following') {
            url = url + '?followerUserId=' + userId;
            urlresponseCode = constants_1.UrlResponseCodes.getFollowingCode;
        }
        else if (dataFor == 'follower') {
            url = url + '?followedUserId=' + userId;
            urlresponseCode = constants_1.UrlResponseCodes.getFollowerCode;
        }
        url = url + '&' + pagination;
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(urlresponseCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(urlresponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.postFollowToggle = function (followRequestModel, callback, showLoader) {
        var _this = this;
        var body = followRequestModel;
        this.myHttp.post(constants_1.UrlConstants.user + '/follow', showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.postFollowTogggleCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.postFollowTogggleCode, _this.myHttp.handleApiErrorResponse(error), followRequestModel);
        });
    };
    HttpUserUtilsService.prototype.getDepartments = function (query, callback, showLoader) {
        var _this = this;
        var url = constants_1.UrlConstants.departmentListUrl + "&query=" + query + "&size=50000";
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.getDepList, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.getDepList, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.postBlockToggle = function (blockedUserId, blockToggle, callback, showLoader) {
        var _this = this;
        var body = {};
        this.myHttp.post(constants_1.UrlConstants.user + '/block/' + blockedUserId + '?blockToggle=' + blockToggle, showLoader, body).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.postBlockTogggleCode, data.data, blockedUserId);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.postBlockTogggleCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.userHashTag = function (query, page, callback, showLoader, term) {
        var _this = this;
        var url = constants_1.UrlConstants.userTaggingUrl + '?type=hashTag' + '&query=' + query + '&page=' + page + '&siza=' + constants_2.Constants.pageSize;
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userTaggingResponseCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userTaggingResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.userMention = function (query, page, callback, showLoader, term) {
        var _this = this;
        var url = constants_1.UrlConstants.userMentionUrl + '?query=' + query + '&page=' + page + '&siza=' + constants_2.Constants.pageSize;
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userMentionResponseCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userMentionResponseCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.getUserSearchTypeAhead = function (typeAheadRequest, callback, showLoader) {
        var _this = this;
        var queryString;
        queryString = this.modelToQueryString(typeAheadRequest);
        this.myHttp.get(constants_1.UrlConstants.userSearchTypeAHead + queryString, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.getUserSearchCode, data.data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.getUserSearchCode, error);
        });
    };
    HttpUserUtilsService.prototype.getBlockedUserList = function (callback, showLoader, term) {
        var _this = this;
        var url = constants_1.UrlConstants.user + '/blocked-users';
        this.myHttp.get(url, showLoader).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.getBlockedUsers, data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.getBlockedUsers, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.forgotPassword = function (email, callback, showLoader) {
        var _this = this;
        var url = constants_1.UrlConstants.userForgotPassword + '?usernameOrEmail=' + email;
        this.myHttp.post(url, showLoader, null).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userForgotPasswordCode, data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userForgotPasswordCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.logoutuser = function (router, language) {
        var _this = this;
        var body = { "userId": storage_service_service_1.StorageService.getUserId() };
        this.myHttp.post(constants_1.UrlConstants.userLogut, false, body).subscribe(function (data) {
            _this.myHttp.setHeader(constants_2.Constants.authToken, null);
            localStorage.clear();
            utils_service_1.UtitlityService.redirectUser(router, '');
            storage_service_service_1.StorageService.setDefaultLanguage(language);
        }, function (error) {
            _this.myHttp.hideLoader();
            _this.myHttp.setHeader(constants_2.Constants.authToken, null);
            localStorage.clear();
            utils_service_1.UtitlityService.redirectUser(router, '');
            storage_service_service_1.StorageService.setDefaultLanguage(language);
        });
    };
    HttpUserUtilsService.prototype.contactUs = function (contactUs, callback, showLoader) {
        var _this = this;
        var formData = new FormData();
        formData.append('name', contactUs.name);
        formData.append('email', contactUs.email);
        formData.append('subject', contactUs.subject);
        formData.append('message', contactUs.message);
        this.myHttp.removeHeader(constants_2.Constants.authToken);
        this.myHttp.post("https://cms.myu.co/web/contact_us/mail_sender", showLoader, formData).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userChangePasswordCode, data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userChangePasswordCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService.prototype.planLeadMail = function (leadData, callback, showLoader) {
        var _this = this;
        var formData = new FormData();
        formData.append('email', leadData.email);
        formData.append('subject', leadData.subject);
        formData.append('message', leadData.message);
        this.myHttp.removeHeader(constants_2.Constants.authToken);
        this.myHttp.post("https://cms.myu.co/web/lead/mail_sender", showLoader, formData).subscribe(function (data) {
            callback.onSuccess(constants_1.UrlResponseCodes.userChangePasswordCode, data);
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.userChangePasswordCode, _this.myHttp.handleApiErrorResponse(error));
        });
    };
    HttpUserUtilsService = __decorate([
        core_1.Injectable()
    ], HttpUserUtilsService);
    return HttpUserUtilsService;
}());
exports.HttpUserUtilsService = HttpUserUtilsService;
