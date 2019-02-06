import { Component, OnInit } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from '../../../../node_modules/firebase'
import * as _ from '../../../../node_modules/lodash'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  downloadLink
  imageId
  leftX
  topY
  db = firebase.database().ref()
  boardId

  constructor(
    private afDb: AngularFireDatabase,
    private state: BoardStateService
  ) { }

  // ! Todo unsubscribe from all listners on destroy
  ngOnInit() {
    const boardId = this.boardId
    this.db
      .child('room')
      .child(`${boardId}`)
      .child('blocks')
      .child(`${this.imageId}`)
      .on('value', snap => {
        // Sync drag position
        this.leftX = snap.val().left
        this.topY = snap.val().top
        // Sync destory components
        const destroyThisComponent = snap.val().destroyThisComponent
        if (destroyThisComponent) {
          const compRef = this.state.componentRef[this.imageId]
          compRef.destroy()

          this.db
          .child('room')
          .child(`${boardId}`)
          .child('blocks')
          .child(`${this.imageId}`)
          .set({})
        }
      })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child(`${this.boardId}`)
    .child('blocks')
    .child(`${this.imageId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const boardId = this.boardId
    const elmnt = element.target
    const elmntId = this.imageId

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
