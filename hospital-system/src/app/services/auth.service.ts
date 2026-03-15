import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  limit 
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // --- High-Speed Patient Search ---
  async searchPatientByNIC(nic: string) {
    if (!nic) return null;
    const cleanNIC = nic.trim();
    
    // Using limit(1) makes the search much faster
    const q = query(
      collection(this.firestore, 'patients'), 
      where('nic', '==', cleanNIC),
      limit(1) 
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const resultDoc = querySnapshot.docs[0];
      return { id: resultDoc.id, ...resultDoc.data() };
    }
    return null;
  }

  // --- Medical Records ---
  async addMedicalRecord(patientNIC: string, record: any) {
    // We use the patient's NIC as the document ID for consistency
    const recordRef = collection(this.firestore, `patients/${patientNIC}/history`);
    return addDoc(recordRef, {
      ...record,
      timestamp: serverTimestamp()
    });
  }

  // --- Auth Checks ---
  getCurrentUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user);
      });
    });
  }

  async getUserRole(uid: string) {
    const docRef = doc(this.firestore, `doctors/${uid}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? 'doctor' : 'patient';
  }

  // --- Registration & Login ---
  async registerPatient(email: string, pass: string, patientData: any) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    const docRef = doc(this.firestore, `patients/${patientData.nic}`);
    return setDoc(docRef, { 
      ...patientData, 
      uid: credential.user.uid, 
      role: 'patient', 
      createdAt: new Date() 
    });
  }

  async registerDoctor(email: string, pass: string, doctorData: any) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    const docRef = doc(this.firestore, `doctors/${credential.user.uid}`);
    return setDoc(docRef, { 
      ...doctorData, 
      uid: credential.user.uid, 
      role: 'doctor', 
      createdAt: new Date() 
    });
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  logout() {
    return signOut(this.auth);
  }
}