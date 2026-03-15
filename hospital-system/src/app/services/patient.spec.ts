import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // Injecting the Firestore database service
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  // Function to register a new patient to the database
  async registerPatient(patientData: any) {
    try {
      // 1. Point to the "patients" collection in our database
      const patientCollection = collection(this.firestore, 'patients');
      
      // 2. Add the data. Firebase will automatically create a unique ID!
      const docRef = await addDoc(patientCollection, patientData);
      
      console.log("Patient successfully registered with ID: ", docRef.id);
      
      // 3. Return the ID so we can use it as the "Hospital ID"
      return docRef.id; 
      
    } catch (error) {
      console.error("Error adding patient to database: ", error);
      throw error;
    }
  }
}