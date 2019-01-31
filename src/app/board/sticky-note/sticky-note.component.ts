import { Component, OnInit, ViewChild } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from '../../../../node_modules/firebase'
import * as _ from '../../../../node_modules/lodash'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit {
  content
  stickyId
  leftX
  topY
  db = firebase.database().ref()
  itemRef = this.afDb.object(`room/0/blocks/${this.stickyId}`)

  @ViewChild('stickyNote') sticky

  constructor(
    private afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.db
      .child('room')
      .child('0')
      .child('blocks')
      .child(`${this.stickyId}`)
      .on('value', snap => {
        this.leftX = snap.val().left
        this.topY = snap.val().top

        this.content = snap.val().content
      })
  }

  dragElement(element) {
    // const elmnt = element.target
    const elmnt = element.target
    const elmntId = this.stickyId

    element = element || window.event
    element.preventDefault()
    document.onmousemove = elementDrag
    document.onmouseup = closeDragElement

    function elementDrag(e) {
      // Update firebase position
      const x = e.clientX
      const y = e.clientY

      const db = firebase.database().ref()
      db.child('room')
        .child('0')
        .child('blocks')
        .child(elmntId)
        .update({
          left: x,
          top: y
        })
    }

    function closeDragElement(e) {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }
  }

  userInput(e) {
    this.db
      .child('room')
      .child('0')
      .child(`blocks/${this.stickyId}`)
      .update({
        content: e.target.value
      })
  }
}
