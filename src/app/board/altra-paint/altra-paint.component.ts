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
  canvasMode
  // sketcher

  constructor(
    private state: BoardStateService,
    private el: ElementRef
  ) { }

  changeMode(mode) {
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    canvas.mode = 'erase'
    // if (mode) {
    //   // Set the update mode
    // } else {
    //   // sketcher.mode = 'draw'; 
    // }
  }

  ngOnInit() {
    const boardId = this.boardId
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    // const sketcher = Atrament(canvas, 3000, 3000, 'orange')
    // sketcher.adaptiveStroke = false
    // sketcher.smoothing = false;
    const canvasId = this.canvasId
    console.log('zzzzboardId', `${boardId}`, 'zzzcanvasId', `${canvasId}`)

    // Listen and Render
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.canvasId}`)
      .on('value', snap => {
        // Sync drag position
        // this.leftX = snap.val().left
        // this.topY = snap.val().top
        // Sync image
        const myImage = new Image()
        myImage.src = snap.val().content
        const ctx = canvas.getContext('2d')
        ctx.drawImage(myImage, 0, 0)

        // Sync destory components
        // const destroyThisComponent = snap.val().destroyThisComponent
        // if (destroyThisComponent) {
        //   const compRef = this.state.componentRef[this.canvasId]
        //   compRef.destroy()
        //   this.db
        //     .child('room')
        //     .child(`${boardId}`)
        //     .child('blocks')
        //     .child(`${this.canvasId}`)
        //     .set({})
        // }
      })
  }

  ngAfterViewInit() {
    console.log('ngAfterviewInit')
    const boardId = this.boardId
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    const sketcher = Atrament(canvas, 1900, 1900, 'orange')
    sketcher.adaptiveStroke = false
    sketcher.smoothing = false;
    sketcher.weight = 20; //in pixels
    sketcher.opacity = 0.5
    const canvasId = this.canvasId
    console.log('ngAfterviewInit2')
    function autoSaveCanvas(id) {
      console.log('auto save canvas')
      const db = firebase.database().ref()
      const sketcherForData =  sketcher //canvas // sketcher
      

      setInterval(() => {
        const autoSaveCanvasId = id
        const dataUrl = sketcherForData.toImage()
        console.log('boardId', `${boardId}`, 'canvasId', `${id}`)
        // db
        //   .child('room')
        //   .child(`${boardId}`)
        //   .child('blocks')
        //   .child(`${canvasId}`)
        //   .update({
        //     content: dataUrl
        //   })
      }, 1000)
    }
    autoSaveCanvas(canvasId)
  }

  // onDeleteClick() {

  //   this.db
  //     .child('room')
  //     .child(`${this.boardId}`)
  //     .child('blocks')
  //     .child(`${this.canvasId}`)
  //     .update({ destroyThisComponent: true })
  // }

  // For performance, I duplicate this code in each component.
  // dragElement(element) {
  //   const elmnt = element.target
  //   const elmntId = this.canvasId
  //   const boardId = this.boardId
  //   element = element || window.event
  //   element.preventDefault()
  //   document.onmousemove = elementDrag
  //   document.onmouseup = closeDragElement

  //   function elementDrag(e) {
  //     // Update firebase position
  //     const x = e.clientX
  //     const y = e.clientY

  //     const db = firebase.database().ref()
  //     db.child('room')
  //       .child(`${boardId}`)
  //       .child('blocks')
  //       .child(elmntId)
  //       .update({
  //         left: x,
  //         top: y
  //       })
  //   }

  //   function closeDragElement(e) {
  //     // stop moving when mouse button is released:
  //     document.onmouseup = null
  //     document.onmousemove = null
  //   }
  // }

}
