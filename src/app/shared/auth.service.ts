import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  loggedIn;
  isAdmin = false;
  adminUserName = 'nzachary46@gmail.com';

  constructor() { }

  userAdminCheck (userName) {
    if (userName ===  this.adminUserName) {
      this.isAdmin = true;
      console.log('user is admin');
    } else {
      console.log('user is not admin');
    }
  }

  isUserAdmin () {
    return this.isAdmin;
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.loggedIn);
          }
          , 50);
      }
    );
    return promise;
  }

  isAuthenticated2() {
    // Reach out to firebase if return true then allow access

    // Else redirect to sign up page with query parameter to show not authenticated msg
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
