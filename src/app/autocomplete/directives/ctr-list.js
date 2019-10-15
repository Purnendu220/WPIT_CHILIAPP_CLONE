"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/timer");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/retryWhen");
require("rxjs/add/operator/do");
var globals_1 = require("../globals");
var CtrListContext = /** @class */ (function () {
    function CtrListContext(results, searching, searchInitialized, isOpen) {
        this.results = results;
        this.searching = searching;
        this.searchInitialized = searchInitialized;
        this.isOpen = isOpen;
    }
    return CtrListContext;
}());
exports.CtrListContext = CtrListContext;
var CtrList = /** @class */ (function () {
    function CtrList(completer, templateRef, viewContainer, cd) {
        this.completer = completer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.ctrListMinSearchLength = globals_1.MIN_SEARCH_LENGTH;
        this.ctrListPause = globals_1.PAUSE;
        this.ctrListAutoMatch = false;
        this.ctrListAutoHighlight = false;
        this.ctrListDisplaySearching = true;
        // private results: CompleterItem[] = [];
        this.term = null;
        // private searching = false;
        this.searchTimer = null;
        this.clearTimer = null;
        this.ctx = new CtrListContext([], false, false, false);
        this._initialValue = null;
        this.viewRef = null;
    }
    CtrList.prototype.ngOnInit = function () {
        this.completer.registerList(this);
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false, false));
    };
    Object.defineProperty(CtrList.prototype, "dataService", {
        set: function (newService) {
            this._dataService = newService;
            this.dataServiceSubscribe();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrList.prototype, "initialValue", {
        set: function (value) {
            var _this = this;
            if (this._dataService && typeof this._dataService.convertToItem === "function") {
                setTimeout(function () {
                    var initialItem = _this._dataService.convertToItem(value);
                    if (initialItem) {
                        _this.completer.onSelected(initialItem, false);
                    }
                });
            }
            else if (!this._dataService) {
                this._initialValue = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CtrList.prototype.search = function (term) {
        var _this = this;
        if (!globals_1.isNil(term) && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
                this.searchTimer = null;
            }
            if (!this.ctx.searching) {
                if (this.ctrListDisplaySearching) {
                    this.ctx.results = [];
                }
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }
            if (this.clearTimer) {
                this.clearTimer.unsubscribe();
            }
            this.searchTimer = Observable_1.Observable.timer(this.ctrListPause).subscribe(function () {
                _this.searchTimerComplete(term);
            });
        }
        else if (!globals_1.isNil(term) && term.length < this.ctrListMinSearchLength) {
            this.clear();
            this.term = "";
        }
    };
    CtrList.prototype.clear = function () {
        var _this = this;
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
        }
        this.clearTimer = Observable_1.Observable.timer(globals_1.CLEAR_TIMEOUT).subscribe(function () {
            _this._clear();
        });
    };
    CtrList.prototype.open = function () {
        if (!this.ctx.searchInitialized) {
            this.search("");
        }
        this.refreshTemplate();
    };
    CtrList.prototype.isOpen = function (open) {
        this.ctx.isOpen = open;
    };
    CtrList.prototype._clear = function () {
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
            this.searchTimer = null;
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.viewContainer.clear();
        this.viewRef = null;
    };
    CtrList.prototype.searchTimerComplete = function (term) {
        // Begin the search
        if (globals_1.isNil(term) || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    };
    CtrList.prototype.refreshTemplate = function () {
        // create the template if it doesn't exist
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
        }
        else {
            // refresh the template
            this.viewRef.context.isOpen = this.ctx.isOpen;
            this.viewRef.context.results = this.ctx.results;
            this.viewRef.context.searching = this.ctx.searching;
            this.viewRef.context.searchInitialized = this.ctx.searchInitialized;
            this.viewRef.detectChanges();
        }
        this.cd.markForCheck();
    };
    CtrList.prototype.getBestMatchIndex = function () {
        var _this = this;
        if (!this.ctx.results || !this.term) {
            return null;
        }
        // First try to find the exact term
        var bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase() === _this.term.toLocaleLowerCase(); });
        // If not try to find the first item that starts with the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().startsWith(_this.term.toLocaleLowerCase()); });
        }
        // If not try to find the first item that includes the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().includes(_this.term.toLocaleLowerCase()); });
        }
        return bestMatch < 0 ? null : bestMatch;
    };
    CtrList.prototype.dataServiceSubscribe = function () {
        var _this = this;
        if (this._dataService) {
            this._dataService
                .catch(function (err) {
                console.error(err);
                console.error("Unexpected error in dataService: errors should be handled by the dataService Observable");
                return [];
            })
                .subscribe(function (results) {
                _this.ctx.searchInitialized = true;
                _this.ctx.searching = false;
                _this.ctx.results = results;
                if (_this.ctrListAutoMatch && results && results.length === 1 && results[0].title && !globals_1.isNil(_this.term) &&
                    results[0].title.toLocaleLowerCase() === _this.term.toLocaleLowerCase()) {
                    // Do automatch
                    _this.completer.onSelected(results[0]);
                    return;
                }
                if (_this._initialValue) {
                    _this.initialValue = _this._initialValue;
                    _this._initialValue = null;
                }
                _this.refreshTemplate();
                if (_this.ctrListAutoHighlight) {
                    _this.completer.autoHighlightIndex = _this.getBestMatchIndex();
                }
            });
            if (this._dataService.dataSourceChange) {
                this._dataService.dataSourceChange.subscribe(function () {
                    _this.term = null;
                    _this.ctx.searchInitialized = false;
                    _this.ctx.searching = false;
                    _this.ctx.results = [];
                    _this.refreshTemplate();
                    _this.completer.onDataSourceChange();
                });
            }
        }
    };
    __decorate([
        core_1.Input()
    ], CtrList.prototype, "ctrListMinSearchLength", void 0);
    __decorate([
        core_1.Input()
    ], CtrList.prototype, "ctrListPause", void 0);
    __decorate([
        core_1.Input()
    ], CtrList.prototype, "ctrListAutoMatch", void 0);
    __decorate([
        core_1.Input()
    ], CtrList.prototype, "ctrListAutoHighlight", void 0);
    __decorate([
        core_1.Input()
    ], CtrList.prototype, "ctrListDisplaySearching", void 0);
    __decorate([
        core_1.Input("ctrList")
    ], CtrList.prototype, "dataService", null);
    __decorate([
        core_1.Input("ctrListInitialValue")
    ], CtrList.prototype, "initialValue", null);
    CtrList = __decorate([
        core_1.Directive({
            selector: "[ctrList]",
        }),
        __param(0, core_1.Host())
    ], CtrList);
    return CtrList;
}());
exports.CtrList = CtrList;
