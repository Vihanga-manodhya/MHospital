import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  docForm = this.fb.group({
    name: ['', Validators.required],
    specialty: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onDocRegister() {
    if (this.docForm.valid) {
      const { email, password, ...data } = this.docForm.value;
      try {
        await this.authService.registerDoctor(email!, password!, data);
        alert('Doctor Registered Successfully!');
        this.docForm.reset();
      } catch (e: any) { alert(e.message); }
    }
  }
}