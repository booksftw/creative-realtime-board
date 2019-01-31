import { Component, ElementRef, OnInit, AfterContentChecked, ViewChild  } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from '../../../../node_modules/firebase'
import * as _ from '../../../../node_modules/lodash'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit, AfterContentChecked {

  content
  stickyId
  leftX
  topY
  db = firebase.database().ref()

  @ViewChild('stickyNote') sticky

  constructor(
    // private el: ElementRef,
    private afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    // this.content = this.afDb.object(`room/0/blocks/${this.stickyId}/content/${this.stickyId}`).valueChanges().subscribe( () => {
    //   console.log(this.sticky.nativeElement.id, 'sticky val')
    // })
    // const itemRef = this.afDb.list(`room/0/blocks/${this.stickyId}`)
    // itemRef.valueChanges().subscribe((snapshot) => {
    //   // update the position of element
    //   // @ts-ignore
    //   this.leftX = snapshot.left
    //   // @ts-ignore
    //   this.topY = snapshot.top
    // })

    this.db.child('room').child('0').child('blocks').child(`${this.stickyId}`).on('value', (snap) => {
      console.log('left', snap.val().left)
      console.log('top', snap.val().top)
      this.leftX = snap.val().left
      this.topY = snap.val().top
    })

  }

  ngAfterContentChecked() {
  }

  onMouseMove(e) {
    const x = e.x
    const y = e.y
    const itemRef = this.afDb.object(`room/0/blocks/${this.stickyId}`)
    itemRef.update({
      left: x, // this.sticky.nativeElement.getBoundingClientRect().left,
      top: y // this.sticky.nativeElement.getBoundingClientRect().top
    })
  }

  userInput(e) {
    console.log('user input', e)
    this.db.child('room').child('0').child(`blocks/${this.stickyId}`).update({
      content: e.target.value,
    })
  }



}
