// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';

export const routes: Routes = [
  // This makes the form appear at http://localhost:4200/register
  { path: 'register', component: PatientRegistrationComponent },
  
  // Optional: This makes the form the default page (http://localhost:4200/)
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];