import { Injectable } from '@angular/core';
import { HttpWrapper } from './http-wrapper';
import { UrlConstants, Constants, UrlResponseCodes } from '../core/constants';
import { StorageService } from './../core/storage-service.service';
import { HttpSuccesFailureResponse } from './http_wrapper_response.intreface';
import { ApiResponseModel } from '../core/model/apiResponse.model';

@Injectable()
export class HttpMediaService {

    constructor(private myHttp: HttpWrapper) {
        myHttp.setHeader(Constants.authToken, StorageService.getToken());
        // myHttp.setHeader('appVersion', Constants.appVersion);
    }

    uploadUserImg(data, callback: HttpSuccesFailureResponse, showLoader: boolean) {
        let urlResCode = (data.mediaFor == "UserProfile") ? UrlResponseCodes.uploadProfCode : UrlResponseCodes.uploadBackCode;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', UrlConstants.media.concat("?binaryMode=true&mediaName=" + data.mediaName + "&objectType=" + data.objectType + "&mediaFor=" + data.mediaFor + "&mediaType=" + data.mediaType + "&objectDataId=" + data.objectDataId), true);
        xhr.setRequestHeader(Constants.authToken, StorageService.getToken());
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        if (showLoader) {
            this.myHttp.showLoader();
        }
        xhr.send(data.media);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                this.myHttp.hideLoader();
                if (xhr.status == 200) {
                    callback.onSuccess(urlResCode, JSON.parse(xhr.response));
                }
                else {
                    callback.onFailure(urlResCode, JSON.parse(xhr.response));
                }
            }
        };
    }
    deleteUserMedia(mediaId, callback: HttpSuccesFailureResponse, showLoader: boolean,type) {
        this.myHttp.delete<ApiResponseModel>(UrlConstants.media.concat("/" + mediaId), showLoader).subscribe(
          data => {
            callback.onSuccess(UrlResponseCodes.userMediaDelete, type);
          },
          error => {
            this.myHttp.hideLoader();
            callback.onFailure(UrlResponseCodes.userMediaDelete, this.myHttp.handleApiErrorResponse(error));
          });
      }
}