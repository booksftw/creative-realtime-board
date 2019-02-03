import { Component, OnInit, ViewChild } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from '../../../../node_modules/firebase'
import { BoardStateService } from 'src/app/shared/board-state.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  content
  textId
  leftX
  topY
  db = firebase.database().ref()
  compRef

  @ViewChild('textEditor') textEditor

  constructor(
    private afDb: AngularFireDatabase,
    private state: BoardStateService
  ){ }

  ngOnInit() {
    this.db
    .child('room')
    .child('0')
    .child('blocks')
    .child(`${this.textId}`)
    .on('value', snap => {
      // Sync drag position
      this.leftX = snap.val().left
      this.topY = snap.val().top

      // this.content = snap.val().content

      // Sync destory components
      const destroyThisComponent = snap.val().destroyThisComponent
      if (destroyThisComponent) {
        const compRef = this.state.componentRef[this.textId]
        compRef.destroy()
        this.db
          .child('room')
          .child('0')
          .child('blocks')
          .child(`${this.textId}`)
          .set({})
      }
    })
  }

  onDeleteClick() {

    this.db
    .child('room')
    .child('0')
    .child('blocks')
    .child(`${this.textId}`)
    .update({ destroyThisComponent: true })
  }

  // For performance, I duplicate this code in each component.
  dragElement(element) {
    const elmnt = element.target
    const elmntId = this.textId

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

  userInput(e) {
    this.db
      .child('room')
      .child('0')
      .child(`blocks/${this.textId}`)
      .update({
        content: e.target.value
      })
  }

}
