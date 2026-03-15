import { Routes } from '@angular/router';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { LoginComponent } from './components/login/login';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';

export const routes: Routes = [
  // මුලින්ම localhost එකට යනකොට පෙන්වන component එක - redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // එහෙමත් නැත්නම් /login කියන URL එකට ගියහම පෙන්වන්න
  { path: 'login', component: LoginComponent },

  // එහෙමත් නැත්නම් /register කියන URL එකට ගියහම පෙන්වන්න
  { path: 'register', component: PatientRegistrationComponent },

  // Doctor Dashboard route
  { path: 'doctor-dashboard', component: DoctorDashboardComponent }

];