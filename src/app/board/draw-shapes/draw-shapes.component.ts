import { Component, OnInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'

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

  constructor() { }

  ngOnInit() {
    this.db
    .child('room')
    .child('0')
    .child('blocks')
    .child(`${this.shapeId}`)
    .on('value', snap => {
      this.leftX = snap.val().left
      this.topY = snap.val().top
    })
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
