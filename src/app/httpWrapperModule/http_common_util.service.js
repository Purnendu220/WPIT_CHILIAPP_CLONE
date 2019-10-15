"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./../core/constants");
var core_1 = require("@angular/core");
var constants_2 = require("../core/constants");
var HttpCommonUtilsService = /** @class */ (function () {
    function HttpCommonUtilsService(myHttp) {
        this.myHttp = myHttp;
        myHttp.setHeader('Content-Type', 'application/json');
    }
    HttpCommonUtilsService.prototype.getUniversitylist = function (callback, showLoader) {
        var _this = this;
        this.myHttp.get(constants_1.UrlConstants.getAllUniversitiesList + "type=university&query=&page=0&size=" + constants_2.Constants.pageSize, showLoader).subscribe(function (data) {
            if (data.statusCode == constants_2.Constants.responseSuccess) {
                callback.onSuccess(constants_1.UrlResponseCodes.getAllUniversitiesCode, data);
            }
            else {
                callback.onFailure(constants_1.UrlResponseCodes.getAllUniversitiesCode, data.statusCode);
            }
        }, function (error) {
            _this.myHttp.hideLoader();
            callback.onFailure(constants_1.UrlResponseCodes.getAllUniversitiesCode, error);
        });
    };
    HttpCommonUtilsService = __decorate([
        core_1.Injectable()
    ], HttpCommonUtilsService);
    return HttpCommonUtilsService;
}());
exports.HttpCommonUtilsService = HttpCommonUtilsService;
