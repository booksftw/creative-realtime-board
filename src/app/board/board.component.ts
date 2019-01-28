import { Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core'
import { StickyNoteComponent } from './sticky-note/sticky-note.component'
import { AngularFireDatabase } from '@angular/fire/database'
import { BoardService } from './../shared/board.service'
import { DragService } from './../shared/drag.service'
import * as $ from 'jquery'
import * as _ from '../../assets/third_party/lodash'
import * as firebase from '../../../node_modules/firebase'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  db
  sessionId

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef


  constructor(
    private dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
    private renderer: Renderer2,
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private drag: DragService
  ) {
    this.db = firebase.database().ref()
    this.sessionId = this.boardUtil.randomId()

    // Set up the board enviorment components
    // const toolbar = this.boardUtil.generateToolBar
    // this.renderEnviormentComponentToPage(toolbar)

    // Get objects and their state from db for this room
    this.db.child('room').child('0').child('blocks').once('value', (snapshot) => {
      const blocksSet = snapshot.val()
      for (const key in blocksSet) {
        if (blocksSet.hasOwnProperty(key)) {
          const el = blocksSet[key]
          const blockId = el.id
          const blockType = el.type
          const blockContent = el.content
          const block = this.boardUtil.generateComponent(blockType, blockContent)
          // this.renderDraggableToPage(block, blockId)
        }
      }
    })
  }

  ngOnInit() {

    // ~ The new renderer instead of jquery append
    const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
    const component = this.entry.createComponent(stickyNoteFactory)
    const component2 = this.entry.createComponent(stickyNoteFactory)
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

  //         // just completely update it.
  //         $(`div#${blockId}`).css('top', el.pos4)
  //         $(`div#${blockId}`).css('left', el.pos3)
  //       }
  //     }
  //   })

  //   // Close event updates
  //   function closeDragElement(e) {
  //     // ! Cut the firebase listeners when client lets go
  //     console.log('client let go')
  //     // Release the user lock
  //     elmnt.userDragging = null

  //     // stop moving when mouse button is released:
  //     document.onmouseup = null
  //     document.onmousemove = null
  //   }
  // }

}
