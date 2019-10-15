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
var forms_1 = require("@angular/forms");
var ctr_completer_1 = require("../directives/ctr-completer");
var globals_1 = require("../globals");
require("rxjs/add/operator/catch");
var base_component_component_1 = require("../../components/base-component/base-component.component");
var noop = function () { };
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CompleterCmp; }),
    multi: true
};
var CompleterCmp = /** @class */ (function (_super) {
    __extends(CompleterCmp, _super);
    function CompleterCmp(completerService, cdr) {
        var _this = _super.call(this) || this;
        _this.completerService = completerService;
        _this.cdr = cdr;
        _this.inputName = "";
        _this.inputId = "";
        _this.pause = globals_1.PAUSE;
        _this.minSearchLength = globals_1.MIN_SEARCH_LENGTH;
        _this.maxChars = globals_1.MAX_CHARS;
        _this.overrideSuggested = false;
        _this.clearSelected = false;
        _this.clearUnselected = false;
        _this.fillHighlighted = true;
        _this.placeholder = "";
        _this.autoMatch = false;
        _this.disableInput = false;
        _this.autofocus = false;
        _this.openOnFocus = false;
        _this.openOnClick = false;
        _this.selectOnClick = false;
        _this.autoHighlight = false;
        _this.selected = new core_1.EventEmitter();
        _this.highlighted = new core_1.EventEmitter();
        _this.blurEvent = new core_1.EventEmitter();
        _this.click = new core_1.EventEmitter();
        _this.focusEvent = new core_1.EventEmitter();
        _this.opened = new core_1.EventEmitter();
        _this.keyup = new core_1.EventEmitter();
        _this.keydown = new core_1.EventEmitter();
        _this.searchStr = "";
        _this.control = new forms_1.FormControl("");
        _this.displaySearching = true;
        _this.displayNoResults = true;
        _this._textNoResults = globals_1.TEXT_NO_RESULTS;
        _this._textSearching = globals_1.TEXT_SEARCHING;
        _this._onTouchedCallback = noop;
        _this._onChangeCallback = noop;
        _this._focus = false;
        _this._open = false;
        return _this;
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: function () { return this.searchStr; },
        set: function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
            }
            // Propagate the change in any case
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    CompleterCmp.prototype.ngAfterViewInit = function () {
        if (this.autofocus) {
            this._focus = true;
        }
    };
    CompleterCmp.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this._focus) {
            setTimeout(function () {
                _this.ctrInput.nativeElement.focus();
                _this._focus = false;
            }, 0);
        }
    };
    CompleterCmp.prototype.onTouched = function () {
        this._onTouchedCallback();
    };
    CompleterCmp.prototype.writeValue = function (value) {
        this.searchStr = value;
    };
    CompleterCmp.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    CompleterCmp.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    CompleterCmp.prototype.setDisabledState = function (isDisabled) {
        this.disableInput = isDisabled;
    };
    Object.defineProperty(CompleterCmp.prototype, "datasource", {
        set: function (source) {
            if (source) {
                if (source instanceof Array) {
                    this.dataService = this.completerService.local(source);
                }
                else if (typeof (source) === "string") {
                    this.dataService = this.completerService.remote(source);
                }
                else {
                    this.dataService = source;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
        set: function (text) {
            if (this._textNoResults != text) {
                this._textNoResults = text;
                this.displayNoResults = !!this._textNoResults && this._textNoResults !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textSearching", {
        set: function (text) {
            if (this._textSearching != text) {
                this._textSearching = text;
                this.displaySearching = !!this._textSearching && this._textSearching !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    CompleterCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        this.completer.opened.subscribe(function (isOpen) {
            _this._open = isOpen;
            _this.opened.emit(isOpen);
        });
    };
    CompleterCmp.prototype.onBlur = function () {
        this.blurEvent.emit();
        this.onTouched();
        this.cdr.detectChanges();
    };
    CompleterCmp.prototype.onFocus = function () {
        this.focusEvent.emit();
        this.onTouched();
    };
    CompleterCmp.prototype.onClick = function (event) {
        this.click.emit(event);
        this.onTouched();
    };
    CompleterCmp.prototype.onKeyup = function (event) {
        this.keyup.emit(event);
    };
    CompleterCmp.prototype.onKeydown = function (event) {
        this.keydown.emit(event);
    };
    CompleterCmp.prototype.onChange = function (value) {
        this.value = value;
    };
    CompleterCmp.prototype.open = function () {
        this.completer.open();
    };
    CompleterCmp.prototype.close = function () {
        this.completer.clear();
    };
    CompleterCmp.prototype.focus = function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.focus();
        }
        else {
            this._focus = true;
        }
    };
    CompleterCmp.prototype.blur = function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.blur();
        }
        else {
            this._focus = false;
        }
    };
    CompleterCmp.prototype.isOpen = function () {
        return this._open;
    };
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "dataService", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "inputName", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "inputId", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "pause", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "minSearchLength", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "maxChars", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "overrideSuggested", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "clearSelected", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "clearUnselected", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "fillHighlighted", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "matchClass", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "fieldTabindex", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "autoMatch", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "disableInput", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "inputClass", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "autofocus", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "openOnFocus", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "openOnClick", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "selectOnClick", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "autoHighlight", void 0);
    __decorate([
        core_1.Output()
    ], CompleterCmp.prototype, "selected", void 0);
    __decorate([
        core_1.Output()
    ], CompleterCmp.prototype, "highlighted", void 0);
    __decorate([
        core_1.Output("blur")
    ], CompleterCmp.prototype, "blurEvent", void 0);
    __decorate([
        core_1.Output()
    ], CompleterCmp.prototype, "click", void 0);
    __decorate([
        core_1.Output("focus")
    ], CompleterCmp.prototype, "focusEvent", void 0);
    __decorate([
        core_1.Output()
    ], CompleterCmp.prototype, "opened", void 0);
    __decorate([
        core_1.Output()
    ], CompleterCmp.prototype, "keyup", void 0);
    __decorate([
        core_1.Output()
    ], CompleterCmp.prototype, "keydown", void 0);
    __decorate([
        core_1.ViewChild(ctr_completer_1.CtrCompleter)
    ], CompleterCmp.prototype, "completer", void 0);
    __decorate([
        core_1.ViewChild("ctrInput")
    ], CompleterCmp.prototype, "ctrInput", void 0);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "datasource", null);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "textNoResults", null);
    __decorate([
        core_1.Input()
    ], CompleterCmp.prototype, "textSearching", null);
    CompleterCmp = __decorate([
        core_1.Component({
            selector: "ng2-completer",
            template: "\n        <div class=\"completer-holder\" ctrCompleter>\n            <input dir=\"{{siteDirection}}\" #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\" class=\"completer-input\" ctrInput [ngClass]=\"inputClass\"\n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\" [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\"\n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\" \n                [openOnClick]=\"openOnClick\" [selectOnClick]=\"selectOnClick\"\n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (click)=\"onClick($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    displaySearching: displaySearching;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown *ngIf=\"isInitialized && isOpen && (( items?.length > 0|| (displayNoResults && !searchActive)) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{_textSearching}}</div>\n                    <div *ngIf=\"!searchActive && (!items || items?.length === 0)\" class=\"completer-no-results\">{{_textNoResults}}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" alt=\"\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\" [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\" class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            styles: ["\n    .completer-dropdown {\n        box-shadow: 0 2px 3px 0 #c5c5c5;\n        border:1px solid #e3e3e3;\n        border-radius: 2px;\n        width: 340px;\n        padding: 0px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;        \n        margin-top: 7px;\n        background-color: #ffffff; \n        max-height:220px;\n        overflow:hidden;\n        overflow-y:auto;\n        color: #000;\n        font-size: 14px;\n        left: -3px;\n    }\n    .completer-holder{\n        position:relative;\n        z-index:1;\n    }\n    .completer-row {\n        padding:15px 5px;\n        font-weight: 400 !important;\n        color:#000;\n        clear: both;\n        display: inline-block;\n        width: 100%;\n        margin-left: 20px;\n        border-bottom:1px solid #e3e3e3;\n    }\n\n    .completer-selected-row {\n        background-color: #f1f2f4;\n        color: #000; \n    }\n\n    .completer-description {\n        font-size: 14px;\n    }\n\n    .completer-image-default {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image {\n        float: right;\n        width: 90%;\n    }\n      @media only screen and (max-width: 480px){\n        .completer-dropdown{width: 100%;}\n      }\n    "],
            providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
        })
    ], CompleterCmp);
    return CompleterCmp;
}(base_component_component_1.BaseComponentComponent));
exports.CompleterCmp = CompleterCmp;
