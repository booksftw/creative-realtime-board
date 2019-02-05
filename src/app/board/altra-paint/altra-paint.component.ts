import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core'
import * as Atrament from '../../../assets/js/attrament-paint'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-altra-paint',
  templateUrl: './altra-paint.component.html',
  styleUrls: ['./altra-paint.component.css']
})
export class AltraPaintComponent implements OnInit, AfterViewInit {
  canvasId
  canvasData
  leftX
  topY
  db = firebase.database().ref()
  compRef
  boardId
  // sketcher

  constructor(
    private state: BoardStateService,
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    const boardId = this.boardId
    console.log(this.el.nativeElement.querySelector('#mySketcher'))
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    const sketcher = Atrament(canvas, 500, 500, 'orange')
    const canvasId = this.canvasId

    // Listen and Intialize Render
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.canvasId}`)
      .once('value', snap => {
        // Sync image
        const myImage = new Image()
        myImage.src = snap.val().content
        const ctx = canvas.getContext('2d')
        console.log('ctx once', ctx)
        ctx.drawImage(myImage, 0, 0)
      })

    // Listen and Render
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
        const myImage = new Image()
        myImage.src = snap.val().content
        const ctx = canvas.getContext('2d')
        ctx.drawImage(myImage, 0, 0)

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

  ngOnInit() {
    const boardId = this.boardId
    console.log(this.el.nativeElement.querySelector('#mySketcher'))
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    const sketcher = Atrament(canvas, 500, 500, 'orange')
    const canvasId = this.canvasId

    function autoSaveCanvas(atrCanvas) {
      const db = firebase.database().ref()
      const sketcherForData = sketcher
      console.log('calling1', sketcherForData)

      setInterval(() => {
        const dataUrl = sketcherForData.toImage()
        console.log('calling')


        db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${canvasId}`)
          .update({
            content: dataUrl
          })
      }, 400)
    }
    autoSaveCanvas(sketcher)
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
