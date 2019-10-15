"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var completer_cmp_1 = require("./components/completer-cmp");
var completer_list_item_cmp_1 = require("./components/completer-list-item-cmp");
var completer_service_1 = require("./services/completer-service");
var completer_data_factory_1 = require("./services/completer-data-factory");
var ctr_completer_1 = require("./directives/ctr-completer");
var ctr_dropdown_1 = require("./directives/ctr-dropdown");
var ctr_input_1 = require("./directives/ctr-input");
var ctr_list_1 = require("./directives/ctr-list");
var ctr_row_1 = require("./directives/ctr-row");
var common_1 = require("@angular/common");
var Ng2CompleterModule = /** @class */ (function () {
    function Ng2CompleterModule() {
    }
    Ng2CompleterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            declarations: [
                completer_list_item_cmp_1.CompleterListItemCmp,
                ctr_completer_1.CtrCompleter,
                ctr_dropdown_1.CtrDropdown,
                ctr_input_1.CtrInput,
                ctr_list_1.CtrList,
                ctr_row_1.CtrRow,
                completer_cmp_1.CompleterCmp
            ],
            exports: [
                completer_cmp_1.CompleterCmp,
                completer_list_item_cmp_1.CompleterListItemCmp,
                ctr_completer_1.CtrCompleter,
                ctr_dropdown_1.CtrDropdown,
                ctr_input_1.CtrInput,
                ctr_list_1.CtrList,
                ctr_row_1.CtrRow
            ],
            providers: [
                completer_service_1.CompleterService,
                completer_data_factory_1.LocalDataFactoryProvider,
                completer_data_factory_1.RemoteDataFactoryProvider
            ]
        })
    ], Ng2CompleterModule);
    return Ng2CompleterModule;
}());
exports.Ng2CompleterModule = Ng2CompleterModule;
