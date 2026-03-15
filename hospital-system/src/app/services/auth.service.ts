import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async registerPatient(email: string, pass: string, patientData: any) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    const patientDocRef = doc(this.firestore, `patients/${patientData.nic}`);
    return setDoc(patientDocRef, {
      uid: credential.user.uid,
      ...patientData,
      createdAt: new Date()
    });
  }
}