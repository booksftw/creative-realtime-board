import { Component, ElementRef, OnInit, AfterContentChecked  } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { DragService } from './../../shared/drag.service'
import * as firebase from '../../../../node_modules/firebase'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit, AfterContentChecked {

  content
  stickyId
  pos3 = 200
  pos4 = 200

  intialPos = {
    'left': this.pos3,
    'right': this.pos4,
  }

  constructor(
    private drag: DragService,
    private el: ElementRef,
    private afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.content = this.afDb.object(`room/0/blocks/${this.stickyId}/content`).valueChanges()
  }

  ngAfterContentChecked() {
    const stickyNote = this.el.nativeElement.querySelectorAll('div')[0]
    this.drag.dragElement(stickyNote)
  }

  userInput(e) {
    const db = firebase.database().ref()
    db.child('room').child('0').child(`blocks/${this.stickyId}`).update({
      content: e.target.value,
    })
  }

}
