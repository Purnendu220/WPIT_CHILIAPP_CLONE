import { Injectable, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
 
@Injectable()
export class LocalizationService {
  static language: string;
 
  static init() {
    var lang = localStorage.getItem("localeId");
    if (lang) {
      console.log("Saved language found.");
      this.language = lang;
    }
    else {
      //  var anyNavigator = navigator as any;
      //  var language: string = anyNavigator.languages && anyNavigator.languages[0] || // Chrome / Firefox
      //  anyNavigator.language ||   // All browsers
      //  anyNavigator.userLanguage; // IE <= 10
      //  lang = language.substring(0, 2);
      this.language = 'ar';
    }
  }
 
  static getTranslationProviders(): Promise<string> {
    this.init();
    // Get the locale id from the global
    const locale = this.language;
    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];
    // No locale or U.S. English: no translation providers
    let translationFile ;
    localStorage.setItem("localeId",locale);
    if (locale === 'en') {
      return Promise.resolve('noProviders');
    }
    else{
      translationFile = `assets/locale/messages.ar.xlf`;
      return this.getTranslations(translationFile)
      .then((translations: string) =>  translations)
      .catch((e) => 'noProviders');
    }
    // ignore if file not found
  }
 
  static getTranslations(file: string): Promise<string> {
    return (window as any).fetch(file).then((response) => {
      return response.text();
    }).catch((e) => console.log(e));
  }
}