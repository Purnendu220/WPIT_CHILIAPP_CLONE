import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'hashTagOrMentionedUser'})
export class HashTagOrMentionedUserPipe implements PipeTransform {
  /**
   * only prototype functionality is pending
   * @param {string} value
   * @returns {any}
   */
  constructor(private sanitized: DomSanitizer) {

  }

  transform(value: string,args: string): any {

    value = this.userMentionDecoder(value);
    value = this.userHashTagCreation(value);
    if(value.length>310 && !args){
      let newsString = ' <a class="c_p"  id="see_more" >see more</a>';
      value = value.substring(0,309)+'...'+''+newsString;
    }
    return this.sanitized.bypassSecurityTrustHtml(value);

  }

  private userHashTagCreation(value: string) {
    const reH = new RegExp('#([A-Za-z0-9_-]+)', 'g');
    let yArray;
    let hashTagObj: any;
    const hasTagList = [];
    let newsString: string;
    while (yArray = reH.exec(value)) {
      hashTagObj = {
        oldString: '',
        hashTag: ''
      };
      hashTagObj.oldString = yArray[0];
      hashTagObj.hashTag = yArray[1];
      hasTagList.push(hashTagObj);
    }

    hasTagList.forEach(function (hashTag) {
      // newsString = '<a href="/newsfeed/' + hashTag.hashTag + '">#' + hashTag.hashTag + '</a>';
      newsString = '<a class="c_p" id="myuhash_'+hashTag.hashTag+'">#' + hashTag.hashTag + '</a>';

      value = value.replace(hashTag.oldString, newsString);
    });
    return value;
  }

  private userMentionDecoder(value: string) {
    const re = new RegExp('@([0-9]+)!~~!([^\\s]+)!~~!([^\\s]+)!>>!', 'g');
    let xArray;
    let userObj: any;
    const mentionedUserList = [];
    let newsString: string;
    /**
     * user mention
     */
    while (xArray = re.exec(value)) {
      userObj = {
        oldString: '',
        id: 0,
        name: '',
        username: '',
      };
      userObj.oldString = xArray[0];
      userObj.id = xArray[1];
      userObj.username = xArray[2];
      userObj.name = xArray[3].toString().replace('%20', ' ');
      mentionedUserList.push(userObj);
    }
    mentionedUserList.forEach(function (mentioned) {
      newsString = '<a class="c_p" routerLink="/user/' + mentioned.id + '" id=myumention_'+mentioned.id+' >@' + mentioned.username + '</a>';
      value = value.replace(mentioned.oldString, newsString);

    });
    return value;
  }


}
