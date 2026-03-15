import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-registration.html',
  styleUrls: ['./doctor-registration.css']
})
export class DoctorRegistrationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  doctorForm = this.fb.group({
    fullName: ['', Validators.required],
    specialty: ['', Validators.required],
    licenseNo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onRegister() {
    if (this.doctorForm.valid) {
      const { email, password, ...details } = this.doctorForm.value;
      try {
        await this.authService.registerDoctor(email!, password!, details);
        alert('Doctor Registered Successfully!');
        this.router.navigate(['/login']);
      } catch (error: any) {
        alert('Error: ' + error.message);
      }
    }
  }
}