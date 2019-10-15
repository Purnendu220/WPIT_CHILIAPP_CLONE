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
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
var completer_base_data_1 = require("./completer-base-data");
var LocalData = /** @class */ (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        var _this = _super.call(this) || this;
        _this.dataSourceChange = new core_1.EventEmitter();
        return _this;
    }
    LocalData.prototype.data = function (data) {
        var _this = this;
        if (data instanceof Observable_1.Observable) {
            var data$ = data;
            data$
                .catch(function () { return []; })
                .subscribe(function (res) {
                _this._data = res;
                if (_this.savedTerm) {
                    _this.search(_this.savedTerm);
                }
                _this.dataSourceChange.emit();
            });
        }
        else {
            this._data = data;
        }
        this.dataSourceChange.emit();
        return this;
    };
    LocalData.prototype.search = function (term) {
        if (!this._data) {
            this.savedTerm = term;
        }
        else {
            this.savedTerm = null;
            var matches = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    };
    LocalData.prototype.convertToItem = function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    LocalData = __decorate([
        core_1.Injectable()
    ], LocalData);
    return LocalData;
}(completer_base_data_1.CompleterBaseData));
exports.LocalData = LocalData;
