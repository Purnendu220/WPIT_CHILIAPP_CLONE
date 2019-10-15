"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var LoaderComponentService = /** @class */ (function () {
    function LoaderComponentService() {
        this.loaderSubject = new Subject_1.Subject();
        this.apiArray = [];
        this.loaderState = this.loaderSubject.asObservable();
    }
    LoaderComponentService.prototype.show = function (loaderFor) {
        var _this = this;
        if (loaderFor && loaderFor.indexOf('user/typeahed') > -1) {
            this.apiArray.push("api");
            setTimeout(function () { return _this.loaderSubject.next({ show: true, loaderClass: 'loaderSearch' }); }, 10);
        }
        else if (loaderFor && (loaderFor.indexOf('notification') > -1 || loaderFor.indexOf('board/join/request') > -1)) {
            this.apiArray.push("api");
            setTimeout(function () { return _this.loaderSubject.next({ show: true, loaderClass: 'loaderNotification' }); }, 10);
        }
        else {
            this.apiArray.push("api");
            setTimeout(function () { return _this.loaderSubject.next({ show: true, loaderClass: 'loaderMain' }); }, 10);
        }
    };
    LoaderComponentService.prototype.hide = function () {
        var _this = this;
        if (this.apiArray.length <= 1) {
            this.apiArray.pop();
            setTimeout(function () { return _this.loaderSubject.next({ show: false, loaderClass: 'loaderMain' }); }, 10);
        }
        else {
            this.apiArray.pop();
        }
    };
    LoaderComponentService = __decorate([
        core_1.Injectable()
    ], LoaderComponentService);
    return LoaderComponentService;
}());
exports.LoaderComponentService = LoaderComponentService;
