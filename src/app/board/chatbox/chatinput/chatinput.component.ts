import { Component, OnInit, ElementRef } from '@angular/core'
import * as firebase from 'node_modules/firebase'
import { ActivatedRoute } from '@angular/router'



@Component({
  selector: 'app-chatinput',
  templateUrl: './chatinput.component.html',
  styleUrls: ['./chatinput.component.css']
})
export class ChatinputComponent implements OnInit {
  userDisplayName
  boardId
  db

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.boardId = data.roomId
      this.userDisplayName = data.userDisplayName
    })
    this.db = firebase.database().ref()

  }


  onEnter(e) {
    // Update a message object to firebase
    const userMessage = e.value.userMessage
    const userDisplayName = this.userDisplayName
    const boardId = this.boardId
    const messageRef = this.db.child('room').child(`${boardId}`).child('messages').push().set({
      userDisplayName: `${userDisplayName}`,
      message: `${userMessage}`
    })

    // Clear the input
    this.el.nativeElement.querySelector('#userMessage').value = ''
  }



}
