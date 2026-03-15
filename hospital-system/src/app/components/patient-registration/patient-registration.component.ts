import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // බාර්කෝඩ් මොඩියුල් එක අයින් කළා
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isSuccess = false;

  registrationForm = this.fb.group({
    fullName: ['', Validators.required],
    nic: ['', [Validators.required, Validators.pattern('^[0-9]{9}[vVxX]|[0-9]{12}$')]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.registrationForm.valid) {
      const { email, password, ...details } = this.registrationForm.value;
      try {
        // AuthService එක හරහා Data සේව් කරනවා
        await this.authService.registerPatient(email!, password!, details);
        this.isSuccess = true;
        alert('Patient Registered Successfully with NIC: ' + details.nic);
        this.registrationForm.reset();
      } catch (error: any) {
        alert('Error: ' + error.message);
      }
    }
  }
}