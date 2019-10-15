"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./../../environments/environment");
var constants_1 = require("./constants");
var core_1 = require("@angular/core");
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService_1 = StorageService;
    StorageService.getToken = function () {
        return localStorage.getItem(constants_1.Constants.authToken);
    };
    StorageService.setToken = function (token) {
        localStorage.setItem(constants_1.Constants.authToken, token.toString());
    };
    StorageService.getDefaultLanguage = function () {
        return localStorage.getItem(constants_1.Constants.defaultLanguage) != null ? localStorage.getItem(constants_1.Constants.defaultLanguage) : 'ar';
    };
    StorageService.setDefaultLanguage = function (language) {
        if (language) {
            localStorage.setItem(constants_1.Constants.defaultLanguage, language.toString());
        }
    };
    StorageService.deleteToken = function () {
        localStorage.removeItem(constants_1.Constants.authToken);
    };
    StorageService.setUser = function (user) {
        localStorage.setItem(constants_1.Constants.userDataKey, JSON.stringify(user));
    };
    StorageService.getUser = function () {
        return JSON.parse(localStorage.getItem(constants_1.Constants.userDataKey));
    };
    StorageService.deleteUser = function () {
        localStorage.removeItem(constants_1.Constants.userDataKey);
    };
    StorageService.getUserId = function () {
        var user = StorageService_1.getUser();
        if (user) {
            return user.id;
        }
        else {
            return 0;
        }
    };
    StorageService.setUserType = function (type) {
        localStorage.setItem(constants_1.Constants.usetType, type);
    };
    StorageService.getUserTypeString = function () {
        if (localStorage.getItem(constants_1.Constants.usetType)) {
            return localStorage.getItem(constants_1.Constants.usetType).toLowerCase();
        }
    };
    StorageService.setIsLoggedIn = function (isLogin) {
        localStorage.setItem(constants_1.Constants.isLoggedInKey, String(isLogin));
    };
    StorageService.getIsLoggedIn = function () {
        if (localStorage.getItem(constants_1.Constants.userDataKey)) {
            return Boolean(localStorage.getItem(constants_1.Constants.userDataKey));
        }
        else {
            return false;
        }
    };
    StorageService.setData = function (key, data) {
        localStorage.setItem(key, data);
    };
    StorageService.getData = function (key) {
        return localStorage.getItem(key);
    };
    StorageService.clearStorage = function () {
        localStorage.removeItem(constants_1.Constants.userDataKey);
        localStorage.removeItem(constants_1.Constants.authToken);
        localStorage.removeItem(constants_1.Constants.usetType);
        localStorage.removeItem(constants_1.Constants.isLoggedInKey);
    };
    StorageService.prototype.getLocalStorage = function (key) {
        try {
            return localStorage.getItem(key);
        }
        catch (e) {
            alert('please allow   for ' + environment_1.environment.hostURL + ' ');
        }
    };
    StorageService = StorageService_1 = __decorate([
        core_1.Injectable()
    ], StorageService);
    return StorageService;
    var StorageService_1;
}());
exports.StorageService = StorageService;
