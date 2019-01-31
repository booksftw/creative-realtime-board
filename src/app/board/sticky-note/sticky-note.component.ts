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
  itemRef = this.afDb.object(`room/0/blocks/${this.stickyId}`)


  @ViewChild('stickyNote') sticky

  constructor(
    // private el: ElementRef,
    private afDb: AngularFireDatabase
  ) { }

  ngOnInit() {

    this.db.child('room').child('0').child('blocks').child(`${this.stickyId}`).on('value', (snap) => {
      console.log('left', snap.val().left)
      console.log('top', snap.val().top)
      this.leftX = snap.val().left
      this.topY = snap.val().top
    })

  }

  ngAfterContentChecked() {
  }


  dragElement(element) {
    const elmnt = element.target
    const elmntId = this.stickyId

    // elmnt.addEventListener('mousedown', dragMouseDown)
  

    // function dragMouseDown(e) {
    //   console.log('drag mouse called')
    //   e = e || window.event
    //   e.preventDefault()
      
    element = element || window.event
    element.preventDefault()
    document.onmousemove = elementDrag
    document.onmouseup = closeDragElement


    function elementDrag(e) {
      console.log('element drag', elmnt)
      // Update firebase position
      let x = e.clientX
      let y = e.clientY
      // this.itemRef.update({
      //   left: x, // this.sticky.nativeElement.getBoundingClientRect().left,
      //   top: y // this.sticky.nativeElement.getBoundingClientRect().top
      // })
      const db = firebase.database().ref()
      db.child('room').child('0').child('blocks').child(elmntId).update({
        left: x,
        top: y,
      })
    }

    function closeDragElement(e) {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }

  }

  userInput(e) {
    console.log('user input', e)
    this.db.child('room').child('0').child(`blocks/${this.stickyId}`).update({
      content: e.target.value,
    })
  }



}
