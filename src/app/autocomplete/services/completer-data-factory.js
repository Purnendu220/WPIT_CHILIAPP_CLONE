"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var local_data_1 = require("./local-data");
var remote_data_1 = require("./remote-data");
function localDataFactory() {
    return function () {
        return new local_data_1.LocalData();
    };
}
exports.localDataFactory = localDataFactory;
function remoteDataFactory(http) {
    return function () {
        return new remote_data_1.RemoteData(http);
    };
}
exports.remoteDataFactory = remoteDataFactory;
exports.LocalDataFactoryProvider = { provide: local_data_1.LocalData, useFactory: localDataFactory };
exports.RemoteDataFactoryProvider = { provide: remote_data_1.RemoteData, useFactory: remoteDataFactory, deps: [http_1.Http] };
