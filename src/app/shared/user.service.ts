import { Injectable } from '@angular/core'
import * as firebase from '../../../node_modules/firebase'
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase
  ) { }

  createUser(displayName) {
    const randomId = Math.floor(Math.random() * 100000)
    // const db = firebase.database().ref()
    // add user to firebase
    // db
    //   .child('users')
    //   .child(`${randomId}`)
    //   .set({
    //     display_name: displayName
    //   })

      this.db.object(`users/${randomId}`).set({
        display_name: displayName
      })
  }
}

