"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var UtitlityService = /** @class */ (function () {
    function UtitlityService() {
    }
    UtitlityService.getObjectFromJson = function (json) {
        try {
            if (json && json !== 'undefined' && json !== 'null') {
                return JSON.parse(json);
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    UtitlityService.openModal = function (modalService, Componenttoopen, windowClass) {
        var modalRef = modalService.open(Componenttoopen, { backdrop: 'static', size: 'lg', keyboard: true, windowClass: windowClass });
        return modalRef;
    };
    UtitlityService.getIdListFromList = function (listOfObject) {
        var list = [];
        listOfObject.forEach(function (element) {
            return list.push(element.Id);
        });
    };
    UtitlityService.markFormGroupTouched = function (formGroup) {
        var _this = this;
        try {
            Object.values(formGroup.controls).forEach(function (control) {
                control.markAsTouched();
                if (control.controls) {
                    control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
                }
            });
        }
        catch (ex) {
            // Code to handle exception
        }
    };
    UtitlityService.handleApiErrorResponse = function (error) {
        var errorMessage;
        var response;
        if (error.status === 0) {
            errorMessage = constants_1.MessagesConstants.connectionRefused;
            return errorMessage;
        }
        else {
            try {
                response = UtitlityService.getObjectFromJson(JSON.stringify(error.json()));
                if (response) {
                    errorMessage = response.errorMessage;
                }
                else {
                    errorMessage = error.statusText;
                }
            }
            catch (e) {
                console.log(e);
                errorMessage = error.statusText;
            }
            return errorMessage;
        }
    };
    UtitlityService.haveValidChars = function (value) {
        if (value.indexOf("%") > -1) {
            return false;
        }
        else if (value.indexOf("^") > -1) {
            return false;
        }
        else if (value.indexOf("`") > -1) {
            return false;
        }
        else if (value.indexOf("\\") > -1) {
            return false;
        }
        else if (value.replace(/\s/g, '').length == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    UtitlityService.base64toBlob = function (base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);
        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);
            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    UtitlityService.base64ToFile = function (base64Data, tempfilename, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var blob = b64toBlob(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), contentType);
        var file = UtitlityService.blobToFile(blob, tempfilename);
        return file;
    };
    UtitlityService.encodeUserTaggingString = function (user) {
        var mentionEncodedStartSeparator = "";
        var mentionEncodedEndSeparator = "!>>!";
        var mentionEncodedSeparator = "!~~!";
        return mentionEncodedStartSeparator + (user.id + mentionEncodedSeparator + user.username.replace(" ", "%20") + mentionEncodedSeparator + user.name).replace(" ", "%20") +
            mentionEncodedEndSeparator;
    };
    UtitlityService.redirectUser = function (router, route, param1, param2) {
        //var redirectTo = environment.language == 'ar' ? route : 'en/' + route;
        var redirectTo = route;
        //console.log(redirectTo);
        if (param2) {
            router.navigate([redirectTo, param1, param2]);
            return;
        }
        if (param1) {
            router.navigate([redirectTo, param1]);
            return;
        }
        router.navigate([redirectTo]);
        return;
    };
    UtitlityService.redirectTo = function (router, url) {
        var redirectTo = url;
        router.navigateByUrl(redirectTo);
    };
    UtitlityService.blobToFile = function (theBlob, fileName) {
        var b = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;
        //Cast to a File() type
        return theBlob;
        // var file = new File(b, 'tempfilename.webm', { type: 'video/webm' });
        // var file = new File([b], 'tempfilename.mp4', {type: 'video/mp4', lastModified: Date.now()});
        // return file;
    };
    return UtitlityService;
}());
exports.UtitlityService = UtitlityService;
