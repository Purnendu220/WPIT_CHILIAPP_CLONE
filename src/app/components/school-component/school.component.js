"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_service_1 = require("../../core/utils.service");
var platform_browser_1 = require("@angular/platform-browser");
var constants_1 = require("../../core/constants");
var login_component_1 = require("../login-signup/login/login.component");
var SchoolComponent = /** @class */ (function() {
    function SchoolComponent(_router, document, modalService, shareDataSubscriptionService, http_user_utils) {
        this._router = _router;
        this.document = document;
        this.modalService = modalService;
        this.shareDataSubscriptionService = shareDataSubscriptionService;
        this.http_user_utils = http_user_utils;
        this.language = '';
        this.isCookiesDisabled = false;
    }
    SchoolComponent.prototype.ngOnInit = function() {
        if (this.document.URL.indexOf('/en') > -1) {
            this.language = 'en';
        } else {
            this.language = 'ar';
        }
    };
    SchoolComponent.prototype.ngAfterViewInit = function() {
        $('.expooo').click(function() {
            $('html,body').animate({
                scrollTop: $('.second').offset().top
            }, 'slow');
        });
        $('.activeforColor').click(); {
            $('.activeforColor').css({ 'font-weight': 'bold', 'color': '#E53481' });
        }
    };
    SchoolComponent.prototype.routeUser = function(route) {
        utils_service_1.UtitlityService.redirectUser(this._router, route);
    };
    SchoolComponent.prototype.handleLanguageChange = function(value) {
        this.document.location.href = this.document.location.origin + (value != '') ? ('/' + value) : '';
    };
    SchoolComponent.prototype.openLogin = function() {
        if (this.isCookiesDisabled) {
            alert(constants_1.MessagesConstants.CookiesDisabled);
        } else {
            var modalRef = utils_service_1.UtitlityService.openModal(this.modalService, login_component_1.LoginComponent);
        }
    };
    SchoolComponent.prototype.leadForSchoolFromWebapp = function(email) {
        var message = $('#summernote').val();
        if (message && email.trim()) {
            var leadData = { email: email, message: message, subject: 'Lead for university or school' };
            this.http_user_utils.planLeadMail(leadData, this, true);
        } else {
            alert('Email & Message required!');
        }
    };
    SchoolComponent.prototype.onFailure = function(type, response, failedId) {
        this.showAlertMessage('Error', '', response, 4000);
    };
    SchoolComponent.prototype.onSuccess = function(type, responsedata, successId) {
        alert('Request successfully send to myU team');
        $('#reqQuote').modal('hide');
    };
    SchoolComponent.prototype.showAlertMessage = function(type, status, message, erroTime) {
        this.shareDataSubscriptionService.show(type, status, message, erroTime);
    };
    SchoolComponent = __decorate([
        core_1.Component({
            selector: 'app-school',
            templateUrl: './school.component.html',
            styleUrls: ['./school.component.scss']
        }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT))
    ], SchoolComponent);
    return SchoolComponent;
}());
exports.SchoolComponent = SchoolComponent;