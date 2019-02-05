import { Component, OnInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-draw-shapes',
  templateUrl: './draw-shapes.component.html',
  styleUrls: ['./draw-shapes.component.css']
})
export class DrawShapesComponent implements OnInit {
  shapeId
  leftX
  topY
  db = firebase.database().ref()
  compRef
  boardId

  constructor(
    private state: BoardStateService
  ) { }

  ngOnInit() {
    console.log('this board id', this.boardId)
    const boardId = this.boardId
    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.shapeId}`)
    .on('value', snap => {
      // Sync drag position
      this.leftX = snap.val().left
      this.topY = snap.val().top
      // Sync destory components
      const destroyThisComponent = snap.val().destroyThisComponent
      if (destroyThisComponent) {
        const compRef = this.state.componentRef[this.shapeId]
        compRef.destroy()
        this.db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${this.shapeId}`)
          .set({})
      }
    })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.shapeId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const elmnt = element.target
    const elmntId = this.shapeId
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
        .child(boardId)
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
