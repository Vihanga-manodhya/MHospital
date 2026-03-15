import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Added for ngModel
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is here
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // --- Dashboard State Variables ---
  userName: string = 'Dr. Vihanga';
  remainingTime: number = 360;
  logoutTimer!: any;
  timerSub!: Subscription;

  // --- Patient Search & Consultation Variables ---
  searchQuery: string = '';
  selectedPatient: any = null;
  diagnosis: string = '';
  prescription: string = '';
  isSearching: boolean = false;

  ngOnInit() {
    // 1. Security Check
    this.checkAuth();

    // 2. Start Security Timer
    this.startAutoLogout();
  }

  async checkAuth() {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
    }
  }

  // --- Advanced Methods ---

  async onSearch() {
    if (!this.searchQuery) return;
    this.isSearching = true;
    
    try {
      const result = await this.authService.searchPatientByNIC(this.searchQuery);
      if (result) {
        this.selectedPatient = result;
      } else {
        alert('No patient found with this NIC.');
        this.selectedPatient = null;
      }
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      this.isSearching = false;
    }
  }

  async saveConsultation() {
    if (!this.selectedPatient || (!this.diagnosis && !this.prescription)) {
      alert("Please enter diagnosis or prescription details.");
      return;
    }

    const record = {
      diagnosis: this.diagnosis,
      prescription: this.prescription,
      doctorName: this.userName,
      date: new Date().toISOString()
    };

    try {
      await this.authService.addMedicalRecord(this.selectedPatient.nic, record);
      alert('Medical records updated successfully!');
      
      // Clear fields after success
      this.diagnosis = '';
      this.prescription = '';
      this.selectedPatient = null;
      this.searchQuery = '';
    } catch (error: any) {
      alert("Failed to save: " + error.message);
    }
  }

  // --- Security Logic ---

  startAutoLogout() {
    // Clear any existing timers first
    if (this.logoutTimer) clearTimeout(this.logoutTimer);

    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, 360000); 

    this.timerSub = timer(0, 1000).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      }
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    if (this.timerSub) this.timerSub.unsubscribe();
  }
}