import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { UserService } from './user.service';
import { UserEntity } from '../model/user-entity';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('email', user?.email + '');
      } else {
        try {
          localStorage.setItem('user', 'null');
          localStorage.setItem('email', 'null');
        } catch (error) {}
      }
    });
  }

  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
        localStorage.setItem('email', email);
      })
      .catch((error) => {
        this.alertService.alertWarning(error.message);
      });
  }

  logInWithGoogleProvider() {
    /*return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        this.alertService.alertWarning(error.message);
      })*/

    return this.firebaseAuthenticationService
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        const user = result.user;
        const email = user?.email;
        this.observeUserState();

        let userEntity: UserEntity = {
          id: '',
          email: email + '',
          name: '',
          universityCareer: '',
          academicYear: 0,
          urlImage: '',
          enabled: false,
        };
        this.userService.add(userEntity);
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  signUpWithEmailAndPassword(name: string, email: string, password: string) {
    return this.firebaseAuthenticationService
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user: UserEntity = {
          id: '',
          email: email,
          name: name,
          universityCareer: '',
          academicYear: 0,
          urlImage: '',
          enabled: true,
        };
        this.userService.add(user);

        localStorage.setItem('email', user?.email + '');
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        this.alertService.alertWarning(error.message);
      });
  }

  recoveryPassword(email: string) {
    let message = '';
    this.firebaseAuthenticationService
      .sendPasswordResetEmail(email)
      .then(() => {
        message =
          'Te hemos enviado un enlace de recuperación a tu correo electrónico.';
      })
      .catch((error) => {
        console.error('Error al enviar el enlace de recuperación:', error);
        message = 'Hubo un error al enviar el enlace. Intenta nuevamente.';
      });
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']));
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      this.router.navigate(['login']);
    });
  }

  getEmail() {
    return localStorage.getItem('email') + '';
  }

  getId() {
    return localStorage.getItem('user');
  }
}
