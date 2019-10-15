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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var completer_base_data_1 = require("./completer-base-data");
var RemoteData = /** @class */ (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.dataSourceChange = new core_1.EventEmitter();
        _this._urlFormater = null;
        _this._dataField = null;
        return _this;
    }
    RemoteData.prototype.remoteUrl = function (remoteUrl) {
        this._remoteUrl = remoteUrl;
        this.dataSourceChange.emit();
        return this;
    };
    RemoteData.prototype.urlFormater = function (urlFormater) {
        this._urlFormater = urlFormater;
    };
    RemoteData.prototype.dataField = function (dataField) {
        this._dataField = dataField;
    };
    /**
     * @deprecated Please use the requestOptions to pass headers with the search request
     */
    RemoteData.prototype.headers = function (headers) {
        this._headers = headers;
    };
    RemoteData.prototype.requestOptions = function (requestOptions) {
        this._requestOptions = requestOptions;
    };
    RemoteData.prototype.search = function (term) {
        var _this = this;
        this.cancel();
        // let params = {};
        var url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        }
        else {
            url = this._remoteUrl + encodeURIComponent(term);
        }
        /*
         * If requestOptions are provided, they will override anything set in headers.
         *
         * If no requestOptions are provided, a new RequestOptions object will be instantiated,
         * and either the provided headers or a new Headers() object will be sent.
         */
        if (!this._requestOptions) {
            this._requestOptions = new http_1.RequestOptions();
            this._requestOptions.headers = this._headers || new http_1.Headers();
        }
        this.remoteSearch = this.http.get(url, this._requestOptions.merge())
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var matches = _this.extractValue(data, _this._dataField);
            return _this.extractMatches(matches, term);
        })
            .catch(function () { return []; })
            .subscribe(function (matches) {
            var results = _this.processResults(matches);
            _this.next(results);
        });
    };
    RemoteData.prototype.cancel = function () {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    };
    RemoteData.prototype.convertToItem = function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return RemoteData;
}(completer_base_data_1.CompleterBaseData));
exports.RemoteData = RemoteData;
