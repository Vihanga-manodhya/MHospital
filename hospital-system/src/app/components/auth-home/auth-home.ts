import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-home.html',
  styleUrls: ['./auth-home.css']
})
export class AuthHomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isLoginMode = true; 
  regType: 'patient' | 'doctor' = 'patient';

  // Login Data
  loginEmail = '';
  loginPassword = '';

  // Registration Form
  regForm = this.fb.group({
    fullName: ['', Validators.required],
    nic: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
ngModel: any;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onLogin() {
    try {
      const res = await this.authService.login(this.loginEmail, this.loginPassword);
      const role = await this.authService.getUserRole(res.user.uid);
      this.router.navigate([role === 'doctor' ? '/doctor-dashboard' : '/register']);
    } catch (e: any) { alert(e.message); }
  }

  async onRegister() {
    if (this.regForm.valid) {
      const { email, password, ...details } = this.regForm.value;
      try {
        if (this.regType === 'patient') {
          await this.authService.registerPatient(email!, password!, details);
        } else {
          await this.authService.registerDoctor(email!, password!, details);
        }
        alert('Registration Successful!');
        this.isLoginMode = true;
      } catch (e: any) { alert(e.message); }
    }
  }
}