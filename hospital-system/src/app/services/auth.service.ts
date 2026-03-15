import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // Patient Registration
  async registerPatient(email: string, pass: string, patientData: any) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    const docRef = doc(this.firestore, `patients/${patientData.nic}`);
    return setDoc(docRef, { ...patientData, uid: credential.user.uid, role: 'patient', createdAt: new Date() });
  }

  // Doctor Registration
  async registerDoctor(email: string, pass: string, doctorData: any) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    const docRef = doc(this.firestore, `doctors/${credential.user.uid}`);
    return setDoc(docRef, { ...doctorData, uid: credential.user.uid, role: 'doctor', createdAt: new Date() });
  }

  // Login Function
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // User Role එක චෙක් කරන්න (Doctor ද නැද්ද කියලා)
  async getUserRole(uid: string) {
    const docRef = doc(this.firestore, `doctors/${uid}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? 'doctor' : 'patient';
  }
}