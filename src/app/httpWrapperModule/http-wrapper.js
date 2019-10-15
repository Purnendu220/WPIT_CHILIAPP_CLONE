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
var utils_service_1 = require("./../core/utils.service");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var constants_2 = require("../core/constants");
var logger_1 = require("../core/logger");
var absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;
var HttpWrapper = /** @class */ (function () {
    function HttpWrapper(router, http, loaderService, globalSubscriptionService) {
        this.router = router;
        this.http = http;
        this.loaderService = loaderService;
        this.globalSubscriptionService = globalSubscriptionService;
        this.headers = {};
        this.errorInterceptors = [];
        this.isShowErrorPopup = true;
        this.baseUrl = '';
        this.setHeader('Myu-Auth-Token', 'application/json');
        this.setHeader('appVersion', '3.3.7');
        this.setHeader('deviceType', 'web');
    }
    HttpWrapper.prototype.defaultErrorInterceptor = function (resp) {
        var data;
        if (typeof resp.json === 'function') {
            data = resp.json();
        }
        else {
            data = resp.statusText;
        }
        return { status: resp.status, data: data };
    };
    HttpWrapper.prototype.setHeader = function (key, value) {
        this.headers[key] = value;
    };
    HttpWrapper.prototype.getHeaderByKey = function (key) {
        return this.headers[key];
    };
    HttpWrapper.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
    };
    HttpWrapper.prototype.removeHeader = function (key) {
        delete this.headers[key];
    };
    HttpWrapper.prototype.addErrorInterceptor = function (interceptor) {
        this.errorInterceptors = this.errorInterceptors.concat([interceptor]);
    };
    HttpWrapper.prototype.get = function (url, isShowLoader, options) {
        if (isShowLoader) {
            this.showLoader(url);
        }
        this.setHeader('Content-Type', 'application/json');
        this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
        return this.http.get(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    };
    HttpWrapper.prototype.post = function (url, isShowLoader, data, options) {
        if (isShowLoader) {
            this.showLoader();
        }
        this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
        if (data instanceof FormData) {
            if (url.indexOf('mail_sender') > -1) {
                this.removeHeader(constants_2.Constants.authToken);
            }
            this.removeHeader('Content-Type');
            if (url.indexOf('mail_sender') == -1) {
                this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
            }
            return this.http.post(this.generateUrl(url), data, this.generateOptions(options))
                .map(this.responseHandler, this)
                .catch(this.handleError);
        }
        else {
            if (url.indexOf('mail_sender') == -1) {
                this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
                this.setHeader('Content-Type', 'application/json');
            }
            return this.http.post(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
                .map(this.responseHandler, this)
                .catch(this.handleError);
        }
    };
    HttpWrapper.prototype.put = function (url, isShowLoader, data, options) {
        if (isShowLoader) {
            this.showLoader();
        }
        this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
        this.setHeader('Content-Type', 'application/json');
        return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    };
    HttpWrapper.prototype.patch = function (url, isShowLoader, data, options) {
        if (isShowLoader) {
            this.showLoader();
        }
        this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
        this.setHeader('Content-Type', 'application/json');
        return this.http.patch(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    };
    HttpWrapper.prototype.delete = function (url, isShowLoader, options) {
        if (isShowLoader) {
            this.showLoader();
        }
        this.setHeader(constants_2.Constants.authToken, storage_service_service_1.StorageService.getToken());
        return this.http.delete(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    };
    HttpWrapper.prototype.generateUrl = function (url) {
        return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
    };
    HttpWrapper.prototype.generateOptions = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        Object.keys(this.headers)
            .filter(function (key) { return _this.headers.hasOwnProperty(key); })
            .forEach(function (key) {
            options.headers.append(key, _this.headers[key]);
        });
        return options;
    };
    HttpWrapper.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error || 'Server Error');
    };
    HttpWrapper.prototype.errorHandler = function (error) {
        return Observable_1.Observable.throw(this.errorInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, error));
    };
    HttpWrapper.prototype.responseHandler = function (res) {
        try {
            this.hideLoader();
        }
        catch (e) {
            console.log(e);
        }
        try {
            if (res.headers.get(constants_2.Constants.authToken)) {
                logger_1.AppLogger.log('Auth-Token', res.headers.get(constants_2.Constants.authToken));
                storage_service_service_1.StorageService.setToken(res.headers.get(constants_2.Constants.authToken));
            }
            return res.json() || {};
        }
        catch (e) {
            return {};
        }
    };
    HttpWrapper.prototype.showLoader = function (loaderFor) {
        this.loaderService.show(loaderFor);
    };
    HttpWrapper.prototype.hideLoader = function () {
        this.loaderService.hide();
    };
    HttpWrapper.prototype.showErrorMessage = function (status, message) {
        this.globalSubscriptionService.show('Error', status, message);
    };
    HttpWrapper.prototype.handleApiErrorResponse = function (error) {
        var errorMessage;
        var response;
        if (error.status === 0) {
            errorMessage = constants_1.MessagesConstants.connectionRefused;
            this.showErrorMessage(error.status, errorMessage);
            return errorMessage;
        }
        else {
            try {
                response = utils_service_1.UtitlityService.getObjectFromJson(JSON.stringify(error.json()));
                if (response) {
                    errorMessage = response.errorMessage;
                    if (response.statusCode == "401") {
                        localStorage.clear();
                        utils_service_1.UtitlityService.redirectUser(this.router, '');
                    }
                }
                else {
                    errorMessage = error.statusText;
                }
            }
            catch (e) {
                console.log(e);
                errorMessage = error.statusText;
            }
            this.showErrorMessage(error.status, errorMessage);
            return errorMessage;
        }
    };
    HttpWrapper = __decorate([
        core_1.Injectable()
    ], HttpWrapper);
    return HttpWrapper;
}());
exports.HttpWrapper = HttpWrapper;
