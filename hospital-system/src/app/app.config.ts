// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Import Firebase modules
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Add your specific config from the Firebase console here


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh5wPryM5_0yYz3qKK22ROlfDzCLmv_Ww",
  authDomain: "mhospital-66c47.firebaseapp.com",
  projectId: "mhospital-66c47",
  storageBucket: "mhospital-66c47.firebasestorage.app",
  messagingSenderId: "77662966607",
  appId: "1:77662966607:web:431628001a38ed28dc2b3a",
  measurementId: "G-DK9HJWQVMK"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ]
};