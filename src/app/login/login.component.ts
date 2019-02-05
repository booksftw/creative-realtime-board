import { Component, OnInit } from '@angular/core'
// import * as firebase from '../../../node_modules/firebase'
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  onLoginSubmit (form) {

    this.afAuth.auth.signInWithEmailAndPassword(form.value.loginEmail, form.value.loginPassword)
      .then(
        result => {
          // this.userErrorAlert = false;
          this.auth.userAdminCheck(form.value.loginEmail);
          this.auth.login();
          this.router.navigate(['/']);
        })
      .catch( error => {
        // this.userErrorAlert = true;
      });
  }

  onSignUpSubmit (form) {

    this.afAuth.auth.createUserWithEmailAndPassword(form.value.signUpEmail, form.value.signUpPassword)
      .then(
        (result) => {
          // this.userErrorAlert = false;
          this.auth.login();
          this.router.navigate(['/']);
        })
      .catch(
        (error) => {
          // this.userErrorAlert = true;
        });
  }


}
