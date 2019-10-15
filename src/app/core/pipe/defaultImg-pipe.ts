import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImage {
  transform(value: string, args: string): string {
    if (value) {
      return value;
    }
    if (args == 'notifyImage') {
      value = '/assets/images/myulogo.png';
      return value;
    } else if (args === 'userProfile') {
      value = '/assets/images/defaultimg.png';
      return value;
    }
    else if (args === 'coverImage') {
      value = '/assets/images/defaultCoverImg.png';
      return value;
    }
  }
}
