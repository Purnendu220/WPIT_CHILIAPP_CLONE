import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoaderState } from './loader';

@Injectable()

export class LoaderComponentService {

  private loaderSubject = new Subject<LoaderState>();
  private apiArray: string[] = [];

  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show(loaderFor?: string) {
    if (loaderFor && loaderFor.indexOf('user/typeahed') > -1) {
      this.apiArray.push("api");
      setTimeout(() => this.loaderSubject.next(<LoaderState>{ show: true, loaderClass: 'loaderSearch' }), 10);
    } else if (loaderFor && (loaderFor.indexOf('notification') > -1 || loaderFor.indexOf('board/join/request') > -1)) {
      this.apiArray.push("api");
      setTimeout(() => this.loaderSubject.next(<LoaderState>{ show: true, loaderClass: 'loaderNotification' }), 10);
    }
    else {
      this.apiArray.push("api");
      setTimeout(() => this.loaderSubject.next(<LoaderState>{ show: true, loaderClass: 'loaderMain' }), 10);
    }

  }

  hide() {
    if (this.apiArray.length <= 1) {
      this.apiArray.pop();
      setTimeout(() => this.loaderSubject.next(<LoaderState>{ show: false, loaderClass: 'loaderMain' }), 10);
    } else {
      this.apiArray.pop();
    }
  }
}
