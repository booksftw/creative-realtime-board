import { Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterContentInit, ComponentRef } from '@angular/core'
import { StickyNoteComponent } from './sticky-note/sticky-note.component'
import { AngularFireDatabase } from '@angular/fire/database'
import { BoardService } from './../shared/board.service'
import { DragService } from './../shared/drag.service'
import * as $ from 'jquery'
// import * as _ from '../../assets/third_party/lodash'
import * as _ from '../../../node_modules/lodash'
import * as firebase from '../../../node_modules/firebase'
import { interval } from 'rxjs'
import { throttle } from 'rxjs/operators'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterContentInit {
  db
  itemsRef
  // component: ComponentRef<StickyNoteComponent>
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef

  constructor(
    private dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
    private renderer: Renderer2,
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private drag: DragService
  ) { }

  testGenerateStickyNote(componentId?) {
    // console.log('generate sticky')
    // componentId ? componentId = componentId : componentId = this.boardUtil.getRandomId()
    //   this.db = firebase.database().ref()
    //   // set intial position
    //   this.db.child('room').child('0').child(`blocks/${componentId}`).set({
    //     id: componentId,
    //     content: 'generated test',
    //     pos1: 0,
    //     pos2: 0,
    //     pos3: 0,
    //     pos4: 0,
    //     type: 'sticky-note'
    //   })
    }

  ngOnInit() {

<<<<<<< HEAD
    // ~ The new renderer instead of jquery append
    const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
    const component = this.entry.createComponent(stickyNoteFactory)
    // const component2 = this.entry.createComponent(stickyNoteFactory)
    console.log(component.instance)
  }

  // renderEnviormentComponentToPage(component) {

  //   if (typeof component === 'function') {
  //     $(document).ready(function() {
  //       $('.board_container').append(
  //         `${component()}`
  //       )
  //     })
  //   } else {
  //     console.log('not a func')
  //     $(document).ready(function() {
  //       $('.board_container').append(
  //         `${component}`
  //       )
  //     })
  //   }

  // }

  // // Render and make divs draggable
  // renderDraggableToPage(component, blockId) {
  //   // Get all the blocks from the db and pass the intial coords to the generate component
  //   const draggableElement =
  //             `<div id=${blockId} class="draggable">
  //                 <div id="dragHeader">Click here to move</div>
  //                 ${component}
  //             </div>`

  //   if (component) {
  //     $('.board_container').append(
  //       `${draggableElement}`
  //     )
  //   }

  //   const getEl = $(`div#${blockId}`)[0]
  //   this.db.child('room').child('0').child('blocks').child(`id${blockId}`).once('value', (snapshot) => {
  //     $(`div#${blockId}`).css('left', snapshot.val().pos3)
  //     $(`div#${blockId}`).css('top', snapshot.val().pos4)
  //   })
  //   // Enable drag
  //   this.drag.dragElement(getEl)
  // }

  // dragElement(elmnt) {
  //   let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  //   const dragHeader = elmnt.childNodes[1]
  //   dragHeader.addEventListener('mousedown', dragMouseDown)
  //   // elmnt.addEventListener('mousedown', dragMouseDown)

  //   function dragMouseDown(e) {
  //     const blockId = elmnt.id
  //     const userId = this.sessionId
  //     elmnt.userDragging = userId
  //     e = e || window.event
  //     e.preventDefault()

  //     if (elmnt.userDragging === userId) {
  //       // update node directly
  //       pos3 = e.clientX
  //       pos4 = e.clientY
  //       // call a function whenever the cursor moves:
  //       document.onmousemove = elementDrag
  //     } else {
  //       // else update it through throttled firebase
  //       const posUpdate = {
  //         pos3: e.clientX,
  //         pos4: e.clientY
  //       }
  //       this.db.child('room').child('0').child('blocks').child(`id${blockId}`).update(posUpdate).then(() => {
  //         const throttleElementDrag = _.throttle(elementDrag, 150)
  //         document.onmousemove = throttleElementDrag// elementDrag
  //       })
  //     }

  //     document.onmouseup = closeDragElement
  //   }

  //   function elementDrag(e) {

  //     this.db = firebase.database().ref()

  //     e = e || window.event
  //     e.preventDefault()
  //     const userId = this.sessionId // replace this with cookies
  //     if (elmnt.userDragging === userId) {
  //       pos1 = pos3 - e.clientX // Old Mouse X Location - New Mouse X Location
  //       pos2 = pos4 - e.clientY // Old Mouse Y Location - New Mouse Y Location
  //       pos3 = e.clientX // Update coords X
  //       pos4 = e.clientY // Update coords Y

  //       // Move the block
  //       elmnt.style.top = (elmnt.offsetTop - pos2) + 'px' // Y update the object directly
  //       elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'// X

  //       const elmntId = elmnt.id

  //       // Testing by selecting id1
  //       this.db.child('room').child('0').child('blocks').child(`id${elmntId}`).once('value', (snapshot) => {
  //         const posUpdates = {
  //           pos1: snapshot.val().pos3 - e.clientX,
  //           pos2: snapshot.val().pos4 - e.clientY,
  //           pos3: e.clientX,
  //           pos4: e.clientY
  //         }
  //         // const elmntId = elmnt.id
  //         this.db.child('room').child('0').child('blocks').child(`id${elmntId}`).update(posUpdates)
  //       })

  //     }
  //   }

  //   // Listener for all receiving clients
  //   this.db.child('room').child('0').child('blocks').on('value', (snapshot) => {

  //     for (const key in snapshot.val()) {
  //       if (snapshot.val().hasOwnProperty(key)) {
  //         const el = snapshot.val()[key]
  //         const blockId = el.id
  //         const block = $(`div#${blockId}`)[0]
=======
    // ~ Render the blocks and their state from firebase
    this.db = firebase.database().ref()
>>>>>>> stable/version2-static-note-experimentaion

    this.db.child('room').child('0').child('blocks').on('child_added', (snapshot) => {
      // console.log('on child added', snapshot.keys, snapshot.val())
      const id = snapshot.val().id
      const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
      const stickyComponent = this.entry.createComponent(stickyNoteFactory)
      stickyComponent.instance.stickyId = snapshot.val().id
    })
    // Important: This forces the app to generate components properly
    this.dbAf.object('room/0/blocks').valueChanges().subscribe((e) => { })

    // this.itemsRef = this.dbAf.list('room/0/blocks')
    // this.itemsRef.snapshotChanges(['child_added']).pipe(throttle(val => interval(2000)))
    //   .subscribe(actions => {
    //     actions.forEach(action => {
    //       console.log('type', action.type)
    //       console.log('key', action.key)
    //       console.log('payload', action.payload.val())
    //       const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
    //       const stickyComponent = this.entry.createComponent(stickyNoteFactory)
    //       stickyComponent.instance.stickyId = action.key
    //     })
    //   })


  }

  ngAfterContentInit(): void { }
}
