import { environment } from './../../environments/environment';
import { FormGroup } from '@angular/forms';
import { MessagesConstants } from './constants';
import { ApiResponseModel } from './model/apiResponse.model';
import { UserMentionData } from './model/userMentionResponse';
import { Base64 } from 'js-base64';
declare var b64toBlob:any;

export class UtitlityService {

  static getObjectFromJson<T>(json: string): T {
    try {
      if (json && json !== 'undefined' && json !== 'null') {
        return <T>JSON.parse(json);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  static openModal(modalService: any, Componenttoopen: any, windowClass?: any): any {
    const modalRef = modalService.open(Componenttoopen, { backdrop: 'static', size: 'lg', keyboard: true, windowClass: windowClass });
    return modalRef;
  }

  static getIdListFromList(listOfObject: any) {
    const list: string[] = [];
    listOfObject.forEach(function (element) {
      return list.push(element.Id);
    });
  }

  static markFormGroupTouched(formGroup: FormGroup) {
    try {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      });
    } catch (ex) {
      // Code to handle exception
    }


  }

  static handleApiErrorResponse(error: Response): string {
    let errorMessage: string;
    let response: ApiResponseModel;
    if (error.status === 0) {
      errorMessage = MessagesConstants.connectionRefused;
      return errorMessage;

    } else {
      try {
        response = UtitlityService.getObjectFromJson<ApiResponseModel>(JSON.stringify(error.json()));
        if (response) {
          errorMessage = response.errorMessage;
        } else {
          errorMessage = error.statusText;
        }
      } catch (e) {
        console.log(e);
        errorMessage = error.statusText;

      }

      return errorMessage;
    }
  }
  static haveValidChars(value) {
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

  }
  static base64toBlob(base64Data, contentType) {
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
  }
  static base64ToFile(base64Data, tempfilename, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var blob = b64toBlob(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), contentType);
    var file =UtitlityService.blobToFile(blob,tempfilename);
    return file;
  }

  static blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
    // var file = new File(b, 'tempfilename.webm', { type: 'video/webm' });
    // var file = new File([b], 'tempfilename.mp4', {type: 'video/mp4', lastModified: Date.now()});

    // return file;
  }
  static encodeUserTaggingString(user: UserMentionData): string {
    let mentionEncodedStartSeparator = "";
    let mentionEncodedEndSeparator = "!>>!";
    let mentionEncodedSeparator = "!~~!";
    return mentionEncodedStartSeparator + (user.id + mentionEncodedSeparator + user.username.replace(" ", "%20") + mentionEncodedSeparator + user.name).replace(" ", "%20") +
      mentionEncodedEndSeparator;
  }
  static redirectUser(router, route, param1?: any, param2?: any) {
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

  }

  static redirectTo(router, url) {
    var redirectTo = url;
    router.navigateByUrl(redirectTo);
  }
}
