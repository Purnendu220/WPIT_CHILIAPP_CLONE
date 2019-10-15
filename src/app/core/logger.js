"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../environments/environment");
var AppLogger = /** @class */ (function () {
    function AppLogger() {
    }
    AppLogger.log = function (title, message) {
        if (!this.isProduction) {
            if (typeof message === 'object') {
                console.log(title + '----:' + JSON.stringify(message));
            }
            else {
                console.log(title + ' -: ' + message);
            }
        }
    };
    AppLogger.isProduction = environment_1.environment.production;
    return AppLogger;
}());
exports.AppLogger = AppLogger;
