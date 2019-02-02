import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { PaperScope, Project, Path, Point, Size, Rectangle, paper } from 'paper'
import * as firebase from '../../../../node_modules/firebase'

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

  @ViewChild('canvasElement') canvasElement: ElementRef;
    scope: PaperScope;
    project: Project;

  constructor() { }

  ngOnInit() {
    // this.scope = new PaperScope()
    // this.project = new Project(this.canvasElement.nativeElement)

    // const canvas = this.canvasElement.nativeElement
    // paper.setup(canvas)

    // var path = new paper.Path();
		// // Give the stroke a color
		// path.strokeColor = 'black';
		// var start = new paper.Point(100, 100);
		// // Move to start and draw a line from there
		// path.moveTo(start);
		// // Note that the plus operator on Point objects does not work
		// // in JavaScript. Instead, we need to call the add() function:
		// path.lineTo(start.add([ 200, -50 ]));
		// // Draw the view now:
		// paper.view.draw();

    // const currentPath = new Path()
    // this.project.activeLayer.addChild(currentPath)
    // // Give the stroke a color
    // currentPath.strokeColor = 'black'
    // const start = new Point(100, 100)
    // // Move to start and draw a line from there
    // currentPath.moveTo(start)
    // // Note the plus operator on Point objects.
    // // PaperScript does that for us, and much more!
    // currentPath.lineTo(start + [ 100, -50 ])

    // ... add some points, set some properties

    var topLeft = new Point(10, 20);
var rectSize = new Size(200, 100);
var rect = new Rectangle(topLeft, rectSize);
console.log(rect); // { x: 10, y: 20, width: 200, height: 100 }
console.log(rect.point); // { x: 10, y: 20 }
console.log(rect.size); // { width: 200, height: 100 }




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
