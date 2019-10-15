import { UrlConstants, UrlResponseCodes } from './../core/constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpWrapper } from './http-wrapper';
import { HttpSuccesFailureResponse } from './http_wrapper_response.intreface';
import { Constants } from '../core/constants';
import { UniversityListObject } from './responseModels/universityListResponse';


@Injectable()
export class HttpCommonUtilsService {


  constructor(private myHttp: HttpWrapper) {
    myHttp.setHeader('Content-Type', 'application/json');

  }
  getUniversitylist(callback: HttpSuccesFailureResponse, showLoader: boolean) {
    this.myHttp.get<UniversityListObject>(UrlConstants.getAllUniversitiesList+"type=university&query=&page=0&size="+Constants.pageSize, showLoader).subscribe(
      data => {
        if (data.statusCode == Constants.responseSuccess) {
          callback.onSuccess(UrlResponseCodes.getAllUniversitiesCode, data);
        }
        else {
          callback.onFailure(UrlResponseCodes.getAllUniversitiesCode, data.statusCode);
        }
      },
      error => {  this.myHttp.hideLoader();
        callback.onFailure(UrlResponseCodes.getAllUniversitiesCode, error);
      });

  }







 }
