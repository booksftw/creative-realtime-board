import { Component, OnInit } from '@angular/core'
import * as firebase from 'node_modules/firebase'


@Component({
  selector: 'app-chatinput',
  templateUrl: './chatinput.component.html',
  styleUrls: ['./chatinput.component.css']
})
export class ChatinputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  onEnter(e) {
    // Update a message object to firebase
    console.log('enter', e.userMessage)
  }
}
