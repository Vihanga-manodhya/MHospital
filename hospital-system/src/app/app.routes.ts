import { Routes } from '@angular/router';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { LoginComponent } from './components/login/login';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration';
import { AuthHomeComponent } from './components/auth-home/auth-home';


export const routes: Routes = [
  { path: '', component: AuthHomeComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },

  { path: 'register', component: PatientRegistrationComponent },

  // Doctor Dashboard route
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },

  { path: 'doctor-reg', component: DoctorRegistrationComponent },

  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
];

