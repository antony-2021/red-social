import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat'
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({ "projectId": "social-network-4676c", "appId": "1:111808492715:web:70d6643e0d71bcddb273ee", "storageBucket": "social-network-4676c.firebasestorage.app", "apiKey": "AIzaSyASsBwoM_X7IK28MDowWWRk-XmUQOUGtEI", "authDomain": "social-network-4676c.firebaseapp.com", "messagingSenderId": "111808492715", "measurementId": "G-SY9PMF6KMN" })), provideAuth(() => getAuth()),
    //AngularFireModule.initializeApp()
    { provide: FIREBASE_OPTIONS, useValue: { "projectId": "social-network-4676c", "appId": "1:111808492715:web:70d6643e0d71bcddb273ee", "storageBucket": "social-network-4676c.firebasestorage.app", "apiKey": "AIzaSyASsBwoM_X7IK28MDowWWRk-XmUQOUGtEI", "authDomain": "social-network-4676c.firebaseapp.com", "messagingSenderId": "111808492715", "measurementId": "G-SY9PMF6KMN" } }
  ]
};
