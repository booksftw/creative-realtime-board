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

  constructor(
    private state: BoardStateService,
    private el: ElementRef
  ) { }

  changeMode(mode) {
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    const ctx = canvas.getContext('2d')
    const boardId = this.boardId
    const dataURL = this.sketcher.toImage()
    console.log(mode , 'change mode')
    // update firebase
    switch (mode) {
      case 'clear':
        this.db.child('room').child(`${boardId}`).child('canvas').update({
          canvasData: 'clear'
        })
        break
      case 'draw':
        this.sketcher.weight = 6 // in pixels
        this.sketcher.mode = 'draw'
        break
      case 'erase':
      this.sketcher.weight = 40 // in pixels
      console.log(mode, 'erase mode online')
        this.sketcher.mode = 'erase'
        break
      default:
        break
    }

  }

  ngOnInit() {
    const boardId = this.boardId
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    this.sketcher = Atrament(canvas, 1900, 1900, 'green')
    this.sketcher.adaptiveStroke = true
    this.sketcher.smoothing = true
    this.sketcher.weight = 6 // in pixels

    // Render the state that's in the database
    this.db.child('room').child(`${boardId}`).child('canvas').on('value', function (snapshot) {
      const ctx = canvas.getContext('2d')

      if (snapshot.val().canvasData === 'clear') {
        console.log('init clear')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      // Draw the canvas on update
      const image = new Image()
      image.onload = function () {
        ctx.drawImage(image, 0, 0)
      }
      image.src = snapshot.val().canvasData
    })
  }

  onSave() {
    const canvas = this.el.nativeElement.querySelector('#mySketcher')
    const boardId = this.boardId
    const dataURL = this.sketcher.toImage()
    const imgData = canvas.toDataURL()

    this.sketcher.clear()
    this.db.child('room').child(`${boardId}`).child('canvas').update({
      canvasData: imgData
    })

  }

  ngAfterViewInit() {


  }

}
