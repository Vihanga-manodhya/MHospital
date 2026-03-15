import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule], // We need these for the form to work
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  // Bring in our Firebase service
  private patientService = inject(PatientService);

  // Data model for the form
  patient = {
    name: '',
    nic: '',
    age: null,
    illness: '',
    assignedDoctor: ''
  };

  generatedHospitalId: string = '';

  // Function that runs when the "Register" button is clicked
  async onSubmit() {
    try {
      const dataToSave = {
        ...this.patient,
        status: 'waiting', // The patient is now waiting in the queue
        registeredAt: new Date()
      };
      
      // Save to Firebase and get the new ID!
      const id = await this.patientService.registerPatient(dataToSave);
      this.generatedHospitalId = id; 
      
      alert(`Success! Generated Hospital ID: ${id}`);
      
      // Clear the form for the next patient
      this.patient = { name: '', nic: '', age: null, illness: '', assignedDoctor: '' };
    } catch (error) {
      console.error(error);
      alert('Registration failed. Check console for details.');
    }
  }
}