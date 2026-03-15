import { Routes } from '@angular/router';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';

export const routes: Routes = [
  // මුලින්ම localhost එකට යනකොට පෙන්වන component එක
  { path: '', component: PatientRegistrationComponent }, 
  
  // එහෙමත් නැත්නම් /register කියන URL එකට ගියහම පෙන්වන්න
  { path: 'register', component: PatientRegistrationComponent },
];