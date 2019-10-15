"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_component_component_1 = require("./../../base-component/base-component.component");
var constants_1 = require("./../../../core/constants");
var core_1 = require("@angular/core");
var signup_component_1 = require("../signup/signup.component");
var forms_1 = require("@angular/forms");
var utils_service_1 = require("../../../core/utils.service");
var validation_service_service_1 = require("../../common/validation-message-component/validation-service.service");
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(Browserlocation, activeModal, modalService, formbuilder, http_user_utils, router) {
        var _this = _super.call(this) || this;
        _this.Browserlocation = Browserlocation;
        _this.activeModal = activeModal;
        _this.modalService = modalService;
        _this.formbuilder = formbuilder;
        _this.http_user_utils = http_user_utils;
        _this.router = router;
        //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        _this.errorMessage = '';
        _this.errorInLogin = false;
        _this.passtype = "password";
        _this.forgotPassword = false;
        Browserlocation.onPopState(function () {
            _this.activeModal.close('Close Model');
        });
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginform = this.formbuilder.group({
            'email': ['', validation_service_service_1.ValidationService.requiredValidator],
            'password': ['', forms_1.Validators.required]
        });
        this.forgotPassForm = this.formbuilder.group({
            'email': ['', [validation_service_service_1.ValidationService.requiredValidator]]
        });
    };
    LoginComponent.prototype.processLogin = function () {
        this.markFormGroupTouched(this.loginform);
        if (this.loginform.valid) {
            this.http_user_utils.login(this.loginform.value.email, this.loginform.value.password, this, true);
        }
    };
    LoginComponent.prototype.forgotPass = function () {
        this.markFormGroupTouched(this.forgotPassForm);
        if (this.forgotPassForm.valid) {
            this.http_user_utils.forgotPassword(this.forgotPassForm.value.email, this, true);
        }
    };
    LoginComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        try {
            Object.values(formGroup.controls).forEach(function (control) {
                control.markAsTouched();
                if (control.controls) {
                    control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
                }
            });
        }
        catch (ex) {
            // Code to handle exception
        }
    };
    LoginComponent.prototype.openRegister = function () {
        this.activeModal.close('Cross click');
        var modalRef = utils_service_1.UtitlityService.openModal(this.modalService, signup_component_1.SignupComponent);
    };
    LoginComponent.prototype.navigateTo = function (url) {
        this.activeModal.close('close modal');
        this.router.navigateByUrl("/" + url);
    };
    LoginComponent.prototype.onSuccess = function (type, responsedata) {
        var _this = this;
        switch (type) {
            case constants_1.UrlResponseCodes.loginUserCode:
                this.errorInLogin = false;
                utils_service_1.UtitlityService.redirectUser(this.router, 'newsfeed', responsedata.id);
                this.activeModal.close('Cross click');
                break;
            case constants_1.UrlResponseCodes.userForgotPasswordCode:
                console.log("success");
                this.forgotPasswordSuccess = constants_1.MessagesConstants.emailSentSuccessfully;
                setTimeout(function () {
                    _this.forgotPasswordSuccess = '';
                    _this.forgotPassword = false;
                }, 5000);
                break;
        }
    };
    LoginComponent.prototype.onFailure = function (type, response) {
        var _this = this;
        switch (type) {
            case constants_1.UrlResponseCodes.loginUserCode:
                this.errorInLogin = true;
                this.errorMessage = response;
                break;
            case constants_1.UrlResponseCodes.userForgotPasswordCode:
                this.errorMessageForgotPassword = response;
                setTimeout(function () {
                    _this.errorMessageForgotPassword = '';
                }, 4000);
                break;
        }
    };
    LoginComponent.prototype.showHidePassword = function () {
        this.passtype = this.passtype === "password" ? "text" : "password";
    };
    LoginComponent.prototype.blurFoucus = function () {
        $('input[name=forgot_email]').blur();
        this.forgotPassword = false;
    };
    __decorate([
        core_1.Input()
    ], LoginComponent.prototype, "name", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}(base_component_component_1.BaseComponentComponent));
exports.LoginComponent = LoginComponent;
