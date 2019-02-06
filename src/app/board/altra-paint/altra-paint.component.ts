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
        // Sync image
        const myImage = new Image()
        myImage.src = snap.val().content
        const ctx = canvas.getContext('2d')
        ctx.drawImage(myImage, 0, 0)
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
      const autoSaveCanvasId = id

      setInterval(() => {
        const autoSaveCanvasIdInterval = autoSaveCanvasId
        const dataUrl = sketcherForData.toImage()
        console.log('boardId', `${boardId}`, 'canvasId', `${autoSaveCanvasIdInterval}`)
        // db
        //   .child('room')
        //   .child(`${boardId}`)
        //   .child('blocks')
        //   .child(`${canvasId}`)
        //   .update({
        //     content: dataUrl
        //   })
      }, 3000)
    }
    autoSaveCanvas(canvasId)
  }

}
