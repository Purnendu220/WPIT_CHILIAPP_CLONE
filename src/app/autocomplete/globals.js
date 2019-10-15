"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./../../environments/environment");
exports.MAX_CHARS = 524288; // the default max length per the html maxlength attribute
exports.MIN_SEARCH_LENGTH = 3;
exports.PAUSE = 10;
exports.TEXT_SEARCHING = environment_1.environment.language == 'ar' ? "جاري البحث..." : "Searching...";
exports.TEXT_NO_RESULTS = environment_1.environment.language == 'ar' ? "لا توجد نتائج " : "No results found";
exports.CLEAR_TIMEOUT = 50;
function isNil(value) {
    return typeof value === "undefined" || value === null;
}
exports.isNil = isNil;
