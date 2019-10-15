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
var core_1 = require("@angular/core");
var login_component_1 = require("../login/login.component");
var utils_service_1 = require("../../../core/utils.service");
var forms_1 = require("@angular/forms");
var validation_service_service_1 = require("../../common/validation-message-component/validation-service.service");
var constants_1 = require("../../../core/constants");
var SignupComponent = /** @class */ (function (_super) {
    __extends(SignupComponent, _super);
    function SignupComponent(activeModal, modalService, formBuilder, http_common_utils, http_user_utils, router, completerService, Browserlocation) {
        var _this = _super.call(this) || this;
        _this.activeModal = activeModal;
        _this.modalService = modalService;
        _this.formBuilder = formBuilder;
        _this.http_common_utils = http_common_utils;
        _this.http_user_utils = http_user_utils;
        _this.router = router;
        _this.completerService = completerService;
        _this.Browserlocation = Browserlocation;
        _this.errorInLogin = false;
        _this.errorMessage = '';
        _this.errorInsignup = false;
        _this.stepSwitchCase = 1;
        _this.userType = 0;
        _this.passtype = "password";
        _this.usernamePattern = "^[A-Za-z][a-zA-Z0-9_]*$";
        Browserlocation.onPopState(function () {
            _this.activeModal.close('Close Model');
        });
        return _this;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signupForm = this.formBuilder.group({
            universityName: new forms_1.FormControl(null, {
                validators: forms_1.Validators.required,
                updateOn: 'blur'
            }),
            name: ['', [validation_service_service_1.ValidationService.requiredValidator, forms_1.Validators.maxLength(250)]],
            userName: ['', [validation_service_service_1.ValidationService.requiredValidator, forms_1.Validators.pattern(this.usernamePattern)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            email: ['', [validation_service_service_1.ValidationService.requiredValidator, forms_1.Validators.email]],
        });
        this.setUpRemoteDataUniversityList();
    };
    SignupComponent.prototype.openLogin = function () {
        this.activeModal.close('Cross click');
        var modalRef = utils_service_1.UtitlityService.openModal(this.modalService, login_component_1.LoginComponent);
    };
    SignupComponent.prototype.signupProcessLogin = function () {
        this.http_user_utils.login(this.signupForm.value.userName, this.signupForm.value.password, this, true);
    };
    SignupComponent.prototype.moveToStep2 = function () {
        if (this.userType > 0) {
            this.stepSwitchCase = 2;
        }
    };
    SignupComponent.prototype.moveToStep3 = function () {
        this.signupForm.controls.universityName.markAsTouched();
        if (this.signupForm.controls.universityName.errors == null) {
            this.stepSwitchCase = 3;
        }
    };
    SignupComponent.prototype.moveToStep4 = function () {
        if (this.signupForm.valid) {
            this.http_user_utils.signup(this.userType, this.universityid, this.signupForm.value.name, this.signupForm.value.userName, this.signupForm.value.email, this.signupForm.value.password, this, true);
        }
    };
    SignupComponent.prototype.selectUniversity = function (event) {
        if (event) {
            this.universityid = event.originalObject.id;
        }
        else {
            this.universityid = undefined;
        }
    };
    SignupComponent.prototype.setUpRemoteDataUniversityList = function () {
        this.universityDataService = this.completerService.remote(null, "name", "name");
        this.universityDataService.urlFormater(function (term) {
            return constants_1.UrlConstants.getAllUniversitiesList + "type=university&query=" + term + "&page=0&size=" + constants_1.Constants.pageSize;
        });
        this.universityDataService.dataField("data");
    };
    SignupComponent.prototype.onSuccess = function (type, responsedata) {
        switch (type) {
            case constants_1.UrlResponseCodes.signupUserCode:
                this.errorInsignup = false;
                this.stepSwitchCase = 4;
                break;
            case constants_1.UrlResponseCodes.loginUserCode:
                this.errorInLogin = false;
                utils_service_1.UtitlityService.redirectUser(this.router, 'newsfeed', responsedata.id);
                this.activeModal.close('cross click');
                break;
        }
    };
    SignupComponent.prototype.onFailure = function (type, response) {
        switch (type) {
            case constants_1.UrlResponseCodes.signupUserCode:
                this.errorInsignup = true;
                this.errorMessage = response;
                break;
            case constants_1.UrlResponseCodes.loginUserCode:
                this.errorInLogin = true;
                this.errorMessage = response;
                break;
        }
    };
    SignupComponent.prototype.showHidePassword = function () {
        this.passtype = this.passtype === "password" ? "text" : "password";
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}(base_component_component_1.BaseComponentComponent));
exports.SignupComponent = SignupComponent;
