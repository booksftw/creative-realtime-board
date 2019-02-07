import { Component, OnInit } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from '../../../../node_modules/firebase'
import * as _ from '../../../../node_modules/lodash'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-frame-background',
  templateUrl: './frame-background.component.html',
  styleUrls: ['./frame-background.component.css']
})
export class FrameBackgroundComponent implements OnInit {
  content
  frameId
  leftX
  topY
  db = firebase.database().ref()
  boardId

  constructor(
    private state: BoardStateService
  ) { }

  // ! Todo unsubscribe from all listners on destroy
  ngOnInit() {
    const boardId = this.boardId
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.frameId}`)
      .on('value', snap => {
        // Sync drag position
        this.leftX = snap.val().left
        this.topY = snap.val().top
        // Sync text
        this.content = snap.val().content
        // Sync destory components
        const destroyThisComponent = snap.val().destroyThisComponent
        if (destroyThisComponent) {
          const compRef = this.state.componentRef[this.frameId]
          compRef.destroy()

          this.db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${this.frameId}`)
          .set({})
        }
      })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.frameId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const boardId = this.boardId
    const elmnt = element.target
    const elmntId = this.frameId

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
      .child(`blocks/${this.frameId}`)
      .update({
        content: e.target.value
      })
  }

}
