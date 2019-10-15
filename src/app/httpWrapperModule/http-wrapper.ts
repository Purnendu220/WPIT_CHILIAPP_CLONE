import { ShareDataSubscriptionService } from './../components/common/sharedata-subscription.service';
import { StorageService } from './../core/storage-service.service';
import { MessagesConstants } from './../core/constants';
import { UtitlityService } from './../core/utils.service';
import { ApiResponseModel } from './../core/model/apiResponse.model';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { Router } from '@angular/router';
import { LoaderComponentService } from '../components/common/loader/loader.service';
import { Constants } from '../core/constants';
import { concat } from 'rxjs/observable/concat';
import { AppLogger } from '../core/logger';


type ResponseInterceptor = (response: any) => any;
type ErrorInterceptor = (error: any) => any;


const absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;

@Injectable()
export class HttpWrapper {

  private headers: any = {};
  private errorInterceptors: Array<ErrorInterceptor> = [];
  private isShowErrorPopup: boolean = true;


  protected baseUrl = '';

  constructor(private router: Router, protected http: Http, private loaderService: LoaderComponentService,
  private globalSubscriptionService:ShareDataSubscriptionService) {
    this.setHeader('Myu-Auth-Token', 'application/json');
    this.setHeader('appVersion', '3.3.7');
    this.setHeader('deviceType', 'web');
  }
  protected defaultErrorInterceptor(resp: Response): any {
    let data;
    if (typeof resp.json === 'function') {
      data = resp.json();
    } else {
      data = resp.statusText;
    }

    return { status: resp.status, data };
  }
  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  getHeaderByKey(key: string) {
    return this.headers[key];
  }


  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  removeHeader(key: string) {
    delete this.headers[key];
  }
  addErrorInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.errorInterceptors = [...this.errorInterceptors, interceptor];
  }

  get<T>(url: string, isShowLoader: boolean, options?: RequestOptionsArgs): Observable<T> {
    if (isShowLoader) { this.showLoader(url); }
    this.setHeader('Content-Type', 'application/json');
    this.setHeader(Constants.authToken, StorageService.getToken());
    return this.http.get(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.handleError)
      ;

  }


  post<T>(url: string, isShowLoader: boolean, data: Object, options?: RequestOptionsArgs): Observable<T> {
    if (isShowLoader) { this.showLoader(); }
    this.setHeader(Constants.authToken, StorageService.getToken());
    if (data instanceof FormData) {
      if(url.indexOf('mail_sender')> -1){this.removeHeader(Constants.authToken);}
      this.removeHeader('Content-Type');
      if(url.indexOf('mail_sender') == -1){
        this.setHeader(Constants.authToken, StorageService.getToken());}
      return this.http.post(this.generateUrl(url), data, this.generateOptions(options))
        .map(this.responseHandler, this)
        .catch(this.handleError)
        ;
    } else {
      if(url.indexOf('mail_sender') == -1){
        this.setHeader(Constants.authToken, StorageService.getToken());
        this.setHeader('Content-Type', 'application/json');}
      return this.http.post(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
        .map(this.responseHandler, this)
        .catch(this.handleError)
        ;
    }


  }


  put<T>(url: string, isShowLoader: boolean, data: Object, options?: RequestOptionsArgs): Observable<T> {
    if (isShowLoader) { this.showLoader(); }
    this.setHeader(Constants.authToken, StorageService.getToken());
    this.setHeader('Content-Type', 'application/json');
    return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.handleError);


  }


  patch<T>(url: string, isShowLoader: boolean, data: Object, options?: RequestOptionsArgs): Observable<T> {
    if (isShowLoader) { this.showLoader(); }
    this.setHeader(Constants.authToken, StorageService.getToken());

    this.setHeader('Content-Type', 'application/json');
    return this.http.patch(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.handleError)
      ;

  }


  delete<T>(url: string, isShowLoader: boolean, options?: RequestOptionsArgs): Observable<T> {
    if (isShowLoader) { this.showLoader(); }
    this.setHeader(Constants.authToken, StorageService.getToken());

    return this.http.delete(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.handleError)
      ;
  }



  protected generateUrl(url: string): string {
    return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
  }


  protected generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
    if (!options.headers) {
      options.headers = new Headers();
    }

    Object.keys(this.headers)
      .filter((key) => this.headers.hasOwnProperty(key))
      .forEach((key) => {
        options.headers.append(key, this.headers[key]);
      });

    return options;
  }
  private handleError(error: Response) {
   return Observable.throw(error || 'Server Error');
  }
  protected errorHandler(error: Response): Observable<any> {
    return Observable.throw(
      this.errorInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), error)
    );
  }
  private responseHandler(res: Response) {
    try {
      this.hideLoader();
    }
    catch (e) {console.log(e) }

    try {
      if (res.headers.get(Constants.authToken)) {
        AppLogger.log('Auth-Token', res.headers.get(Constants.authToken))
        StorageService.setToken(res.headers.get(Constants.authToken));
      }
      return res.json() || {};
    } catch (e) { return {}; }

  }
  public showLoader(loaderFor?:any): void {
    this.loaderService.show(loaderFor);
  }

  public hideLoader(): void {
    this.loaderService.hide();
  }
  showErrorMessage(status, message) {
    this.globalSubscriptionService.show('Error',status, message);
  }

   handleApiErrorResponse(error: Response): string {    let errorMessage: string;
    let response: ApiResponseModel;
    if (error.status === 0) {
      errorMessage = MessagesConstants.connectionRefused;
      this.showErrorMessage(error.status,errorMessage);

      return errorMessage;

    } else {
      try {
        response = UtitlityService.getObjectFromJson<ApiResponseModel>(JSON.stringify(error.json()));
        if (response) {
          errorMessage = response.errorMessage;
          if (response.statusCode == "401") {
           localStorage.clear();
           UtitlityService.redirectUser(this.router,'')

          }
        } else {
          errorMessage = error.statusText;
        }
      } catch (e) {
        console.log(e);
        errorMessage = error.statusText;

      }
      this.showErrorMessage(error.status,errorMessage);
      return errorMessage;
    }
  }
}
