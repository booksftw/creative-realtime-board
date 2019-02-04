import { Directive, ElementRef, HostListener } from '@angular/core'
import * as firebase from '../../../node_modules/firebase'

@Directive({
  selector: '[appDrawWithPen]'
})
export class DrawWithPenDirective {

  @HostListener('mousedown', ['$event']) onmousedown(docE) {

    const elmnt = this.el.nativeElement
    const elementId = elmnt.className
    const docX = docE.offsetX
    const docY = docE.offsetY
    document.onmousemove = elementDrag
    document.onmouseup = closeDragElement


    const db = firebase.database().ref()
    db.child('room')
      .child('0')
      .child('blocks')
      .child(elementId)
      .update({
        drawMoveToX: docX,
        drawMoveToY: docY
      }).then(() => { console.log('mouse down') })

    let drawMoveToX = docX
    let drawMoveToY = docY

    function elementDrag(e) {
      // Update firebase position
      const x = e.offsetX
      const y = e.offsetY


      db.child('room')
        .child('0')
        .child('blocks')
        .child(elementId)
        .update({
          drawMoveToX,
          drawMoveToY,
          drawLineToX: x,
          drawLineToY: y
        })
      drawMoveToX = x
      drawMoveToY = y
    }

    function closeDragElement(e) {
      document.onmouseup = null
      document.onmousemove = null
    }
  }

  constructor(
    private el: ElementRef
  ) { }


}
