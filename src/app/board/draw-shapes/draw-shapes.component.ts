import { Component, OnInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service';

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

  constructor(
    private state: BoardStateService
  ) { }

  ngOnInit() {
    this.db
    .child('room')
    .child('0')
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
          .child('0')
          .child('blocks')
          .child(`${this.shapeId}`)
          .set({})
      }
    })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child('0')
    .child('blocks')
    .child(`${this.shapeId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const elmnt = element.target
    const elmntId = this.shapeId

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

}
