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
var core_1 = require("@angular/core");
var ctr_dropdown_1 = require("./ctr-dropdown");
var CtrRow = /** @class */ (function () {
    function CtrRow(el, renderer, dropdown) {
        this.el = el;
        this.renderer = renderer;
        this.dropdown = dropdown;
        this.selected = false;
    }
    CtrRow.prototype.ngOnDestroy = function () {
        if (this._rowIndex) {
            this.dropdown.unregisterRow(this._rowIndex);
        }
    };
    Object.defineProperty(CtrRow.prototype, "ctrRow", {
        set: function (index) {
            this._rowIndex = index;
            this.dropdown.registerRow(new ctr_dropdown_1.CtrRowItem(this, this._rowIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrRow.prototype, "dataItem", {
        set: function (item) {
            this._item = item;
        },
        enumerable: true,
        configurable: true
    });
    CtrRow.prototype.onClick = function (event) {
        this.dropdown.onSelected(this._item);
    };
    CtrRow.prototype.onMouseEnter = function (event) {
        this.dropdown.highlightRow(this._rowIndex);
    };
    CtrRow.prototype.onMouseDown = function (event) {
        this.dropdown.rowMouseDown();
    };
    CtrRow.prototype.setHighlighted = function (selected) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    };
    CtrRow.prototype.getNativeElement = function () {
        return this.el.nativeElement;
    };
    CtrRow.prototype.getDataItem = function () {
        return this._item;
    };
    __decorate([
        core_1.Input()
    ], CtrRow.prototype, "ctrRow", null);
    __decorate([
        core_1.Input()
    ], CtrRow.prototype, "dataItem", null);
    __decorate([
        core_1.HostListener("click", ["$event"])
    ], CtrRow.prototype, "onClick", null);
    __decorate([
        core_1.HostListener("mouseenter", ["$event"])
    ], CtrRow.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener("mousedown", ["$event"])
    ], CtrRow.prototype, "onMouseDown", null);
    CtrRow = __decorate([
        core_1.Directive({
            selector: "[ctrRow]",
        }),
        __param(2, core_1.Host())
    ], CtrRow);
    return CtrRow;
}());
exports.CtrRow = CtrRow;
