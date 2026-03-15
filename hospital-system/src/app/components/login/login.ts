import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  async onLogin() {
    try {
      const res = await this.authService.login(this.email, this.password);
      const role = await this.authService.getUserRole(res.user.uid);
      
      if (role === 'doctor') {
        this.router.navigate(['/doctor-dashboard']);
      } else {
        alert('Login Successful! Welcome Patient.');
        // පේෂන්ට්ව වෙනම dashboard එකකට යවන්න පුළුවන්
      }
    } catch (e: any) {
      alert(e.message);
    }
  }
}