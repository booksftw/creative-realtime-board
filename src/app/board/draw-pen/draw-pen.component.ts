import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'

@Component({
  selector: 'app-draw-pen',
  templateUrl: './draw-pen.component.html',
  styleUrls: ['./draw-pen.component.css']
})
export class DrawPenComponent implements OnInit, AfterViewInit {

  canvasId
  leftX
  topY
  db = firebase.database().ref()
  @ViewChild('canvasEl') canvasEl

  constructor() { }

  ngOnInit() {

    const canvas = this.canvasEl.nativeElement
    const ctx = canvas.getContext('2d')


    // this.db
    //   .child('room')
    //   .child('0')
    //   .child('blocks')
    //   .child(`${this.canvasId}`)
    //   .once('value', snap => {
    //     ctx.closePath()
    //     ctx.beginPath()
    //     // Draw here
    //     console.log('moveToX', snap.val().drawMoveToX, 'moveToY', snap.val().drawMoveToY)
    //     ctx.moveTo(snap.val().drawMoveToX, snap.val().drawMoveToY)
    //   })


  }

  ngAfterViewInit() {
    const canvas = this.canvasEl.nativeElement
    const ctx = canvas.getContext('2d')
    // ctx.beginPath()
    this.db
    .child('room')
    .child('0')
    .child('blocks')
    .child(`${this.canvasId}`)
    .on('value', snap => {
      // Move draggable container
      this.leftX = snap.val().left
      this.topY = snap.val().top
      // Draw in box
      ctx.lineTo(snap.val().drawLineToX, snap.val().drawLineToY)
      ctx.stroke()
      // ctx.closePath()
    })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    console.log('drag el', element)
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
