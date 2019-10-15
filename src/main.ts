import { enableProdMode, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LocalizationService } from './app/localization.service';

if (environment.production) {
  enableProdMode();
}
  platformBrowserDynamic().bootstrapModule(AppModule);

// LocalizationService.getTranslationProviders().then(providers => {
//   var lang = localStorage.getItem("localeId");
//   let providers_to_add;
//   if(lang==='en'){
//     providers_to_add={
//       providers: []
//   }
//   }else{
//      providers_to_add={
//       providers: [{provide: TRANSLATIONS, useValue: providers},{provide: LOCALE_ID, useValue: 'ar-EG'}]
//   }
//   }
//   platformBrowserDynamic().bootstrapModule(AppModule,providers_to_add);

// });