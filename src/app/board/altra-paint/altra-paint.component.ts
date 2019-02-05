import { Component, OnInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-altra-paint',
  templateUrl: './altra-paint.component.html',
  styleUrls: ['./altra-paint.component.css']
})
export class AltraPaintComponent implements OnInit {
  canvasId
  canvasData
  leftX
  topY
  db = firebase.database().ref()
  compRef
  boardId

  constructor(
    private state: BoardStateService
  ) { }

  ngOnInit() {
    const boardId = this.boardId
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.canvasId}`)
      .on('value', snap => {
        // Sync drag position
        this.leftX = snap.val().left
        this.topY = snap.val().top

        // Sync image

        // Sync destory components
        const destroyThisComponent = snap.val().destroyThisComponent
        if (destroyThisComponent) {
          const compRef = this.state.componentRef[this.canvasId]
          compRef.destroy()
          this.db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${this.canvasId}`)
          .set({})
        }
      })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.canvasId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const elmnt = element.target
    const elmntId = this.canvasId
    const boardId = this.boardId
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

}
