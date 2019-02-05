import { Component, OnInit, ViewChild } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from '../../../../node_modules/firebase'
import * as _ from '../../../../node_modules/lodash'
import { BoardStateService } from 'src/app/shared/board-state.service'

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
  boardId

  @ViewChild('stickyNote') sticky

  constructor(
    private afDb: AngularFireDatabase,
    private state: BoardStateService
  ) { }

  // ! Todo unsubscribe from all listners on destroy
  ngOnInit() {
    const boardId = this.boardId
    console.log('sticky board id', boardId)
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.stickyId}`)
      .on('value', snap => {
        // Sync drag position
        this.leftX = snap.val().left
        this.topY = snap.val().top
        // Sync text
        this.content = snap.val().content
        // Sync destory components
        const destroyThisComponent = snap.val().destroyThisComponent
        if (destroyThisComponent) {
          const compRef = this.state.componentRef[this.stickyId]
          compRef.destroy()

          this.db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${this.stickyId}`)
          .set({})
        }
      })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.stickyId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const boardId = this.boardId
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
        .child(`${boardId}`)
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
      .child(`${this.boardId}`)
      .child(`blocks/${this.stickyId}`)
      .update({
        content: e.target.value
      })
  }
}
