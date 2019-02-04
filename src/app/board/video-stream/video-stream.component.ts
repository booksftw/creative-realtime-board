import { Component, OnInit } from '@angular/core'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service';


@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
  vidFrameId
  leftX
  topY
  db = firebase.database().ref()
  boardId

  constructor(
    private state: BoardStateService
  ) { }

  ngOnInit() {
    const boardId = this.boardId
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.vidFrameId}`)
      .on('value', snap => {
        // Sync drag position
        this.leftX = snap.val().left
        this.topY = snap.val().top

        // Sync destory components
        const destroyThisComponent = snap.val().destroyThisComponent
        if (destroyThisComponent) {
          const compRef = this.state.componentRef[this.vidFrameId]
          compRef.destroy()

          this.db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${this.vidFrameId}`)
          .set({})
        }
      })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.vidFrameId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const boardId = this.boardId
    const elmnt = element.target
    const elmntId = this.vidFrameId

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
