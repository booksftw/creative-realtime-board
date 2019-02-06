import { Component, OnInit, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core'
import * as Atrament from '../../../assets/js/attrament-paint'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-altra-paint',
  templateUrl: './altra-paint.component.html',
  styleUrls: ['./altra-paint.component.css']
})
export class AltraPaintComponent implements OnInit, AfterViewInit {
  canvasData
  db = firebase.database().ref()

  sketcher

  @Input() boardId
  canvasMode
  // sketcher

  constructor(
    private state: BoardStateService,
    private el: ElementRef
  ) { }

  changeMode(mode) {
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    canvas.mode = 'erase'
    console.log('change mode clear canvas')
    this.sketcher.clear()
    // if (mode) {
    //   // Set the update mode
    // } else {
    //   // sketcher.mode = 'draw' 
    // }
  }

  ngOnInit() {
    const boardId = this.boardId
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    this.sketcher = Atrament(canvas, 1900, 1900, 'orange')
    this.sketcher.adaptiveStroke = true
    this.sketcher.smoothing = true
    this.sketcher.weight = 6 // in pixels
    // this.sketcher.opacity = 0.8

    // Render the state that's in the database
    this.db.child('room').child(`${boardId}`).child('canvas').on('value', function(snapshot) {
      // Draw the canvas on update
      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.onload = function () {
        ctx.drawImage(image, 0, 0)
      }
      image.src = snapshot.val().canvasData


    })

  }

  onSave() {
    const boardId = this.boardId
    const dataURL = this.sketcher.toImage()
    this.db.child('room').child(`${boardId}`).child('canvas').update({
      canvasData: dataURL
    })

    this.sketcher.clear()
  }

  ngAfterViewInit() {


  }

}
