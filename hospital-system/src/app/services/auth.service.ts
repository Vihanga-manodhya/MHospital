import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService { // <--- Make sure this name matches what you import
  private auth = inject(Auth);

  registerPatient(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}