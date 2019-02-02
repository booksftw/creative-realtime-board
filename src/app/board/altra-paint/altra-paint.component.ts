import { Component, OnInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'

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

  constructor() { }

  ngOnInit() {
    this.db
    .child('room')
    .child('0')
    .child('blocks')
    .child(`${this.canvasId}`)
    .on('value', snap => {
      this.leftX = snap.val().left
      this.topY = snap.val().top
    })
  }

    // For performance, I duplicate this code in each component.
    dragElement(element) {
      const elmnt = element.target
      const elmntId = this.canvasId
  
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
