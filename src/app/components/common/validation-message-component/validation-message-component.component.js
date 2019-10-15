"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var validation_service_service_1 = require("./validation-service.service");
var ValidationMessageComponent = /** @class */ (function () {
    function ValidationMessageComponent() {
    }
    Object.defineProperty(ValidationMessageComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return validation_service_service_1.ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], ValidationMessageComponent.prototype, "control", void 0);
    ValidationMessageComponent = __decorate([
        core_1.Component({
            selector: 'app-validation-message-component',
            templateUrl: './validation-message-component.component.html',
            styleUrls: ['./validation-message-component.component.scss']
        })
    ], ValidationMessageComponent);
    return ValidationMessageComponent;
}());
exports.ValidationMessageComponent = ValidationMessageComponent;
