import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReCaptchaV3Provider, initializeAppCheck, provideAppCheck } from '@angular/fire/app-check';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      'projectId': 'sabt-website',
      'appId': '1:860552880241:web:91ccfff73e0148cfc6bbd0',
      'storageBucket': 'sabt-website.appspot.com',
      'apiKey': 'AIzaSyBDDDuEKse8s1OflFOO0msZkhWX_dpvLmw',
      'authDomain': 'sabt-website.firebaseapp.com',
      'messagingSenderId': '860552880241',
    }))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideAppCheck(() => {
      const provider = new ReCaptchaV3Provider('6LfKX0EpAAAAAEe5WIEsfNxcSc3-kqKKoFl26bjS');
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    })),
  ]
};
