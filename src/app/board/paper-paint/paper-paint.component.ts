import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { PaperScope, Project, Path, Point, Size, Rectangle, paper } from 'paper'
import * as firebase from '../../../../node_modules/firebase'
import { pathToFileURL } from 'url';

@Component({
  selector: 'app-paper-paint',
  templateUrl: './paper-paint.component.html',
  styleUrls: ['./paper-paint.component.css']
})
export class PaperPaintComponent implements OnInit {
  canvasId
  canvasData
  leftX
  topY
  db = firebase.database().ref()
  path
  myPath

  @ViewChild('canvasElement') canvasElement: ElementRef;
  scope: PaperScope;
  project: Project;

  constructor() { }

  ngOnInit() {
    this.scope = new PaperScope()
    this.project = new Project(this.canvasElement.nativeElement)

    const start = new paper.Point(100, 100)

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

  onMouseDown(event) {
    this.myPath = new Path()
    this.myPath.strokeColor = 'black'
    document.onmousemove = this.onMouseDrag
  }
  

  onMouseDrag(event) {
    console.log('mouse drag', event)
  }
  
  onMouseUp(event) {
    const myCircle = new Path.Circle({
      center: event.point,
      radius: 10
    })
    myCircle.strokeColor = 'black'
    myCircle.fillColor = 'white'
  }

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
