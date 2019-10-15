import {Pipe, PipeTransform} from '@angular/core';
import {UserType} from '../constants';

@Pipe({name: 'usertypeIdToUserType'})
export class UserTypeIdToUserTypePipe implements PipeTransform {
  /**
   * only prototype functionality is pending
   * @param {string} value
   * @returns {any}
   */
  transform(value: number): any {
    return UserType.typeIdList[value];
  }


}
