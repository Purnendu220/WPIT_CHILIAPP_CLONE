import {environment} from '../../environments/environment';


export class AppLogger {
  static isProduction = environment.production;

  static log(title, message) {
    if (!this.isProduction) {
      if (typeof message === 'object') {
        console.log(title + '----:'+JSON.stringify(message));
      }  else {
        console.log(title + ' -: ' + message);
      }

    }
  }


}
