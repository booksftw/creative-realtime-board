import { BoardService } from './../shared/board.service'
import { AngularFireDatabase } from '@angular/fire/database'
import { Component } from '@angular/core'
import * as $ from 'jquery'
import * as _ from '../../assets/third_party/lodash'
import * as firebase from '../../../node_modules/firebase'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  db
  sessionId
  constructor(
    dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
  ) {

    this.db = firebase.database().ref()
    this.sessionId = this.boardUtil.randomId()

    this.db.child('room').child('0').child('blocks').once('value', (snapshot) => {
      const blocksSet = snapshot.val()
      for (const key in blocksSet) {
        if (blocksSet.hasOwnProperty(key)) {
          const el = blocksSet[key]
          const blockId = el.id
          const blockType = el.type
          const blockContent = el.content
          const block = this.boardUtil.generateComponent(blockType, blockContent);
          this.renderToPage(block, blockId)
        }
      }
    })
  }

  // Render and make divs draggable
  renderToPage(component, blockId) {
    // Get all the blocks from the db and pass the intial coords to the generate component
    const draggableElement =
              `<div id=${blockId} class="draggable">
                  ${component}
              </div>`

    if (component) {
      $('.board_container').append(
        `${draggableElement}`
      )
    }

    // $(document).ready(function () {
    const getEl = $(`div#${blockId}`)[0]

    this.db.child('room').child('0').child('blocks').child(`id${blockId}`).once('value', (snapshot) => {
      $(`div#${blockId}`).css('left', snapshot.val().pos3)
      $(`div#${blockId}`).css('top', snapshot.val().pos4)
    })
    // })
    // Enable drag
    this.dragElement(getEl)
  }

  dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    // elmnt.onmousedown = dragMouseDown
    elmnt.addEventListener('mousedown', dragMouseDown)
    // Try adding the dragger to the header

    function dragMouseDown(e) {
      const blockId = elmnt.id
      const userId = this.sessionId
      elmnt.userDragging = userId
      e = e || window.event
      e.preventDefault()

      // ? Does this seperate the dragger and receiver successfully
      if (elmnt.userDragging === userId) {
        // update node directly
        pos3 = e.clientX
        pos4 = e.clientY
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      } else {
        // else update it through throttled firebase
        const posUpdate = {
          pos3: e.clientX,
          pos4: e.clientY
        }
        this.db.child('room').child('0').child('blocks').child(`id${blockId}`).update(posUpdate).then(() => {
          const throttleElementDrag = _.throttle(elementDrag, 150)
          document.onmousemove = throttleElementDrag// elementDrag
        })
      }

      document.onmouseup = closeDragElement
    }

    function elementDrag(e) {

      this.db = firebase.database().ref()

      e = e || window.event
      e.preventDefault()
      const userId = this.sessionId // replace this with cookies
      if (elmnt.userDragging === userId) {
        pos1 = pos3 - e.clientX // Old Mouse X Location - New Mouse X Location
        pos2 = pos4 - e.clientY // Old Mouse Y Location - New Mouse Y Location
        pos3 = e.clientX // Update coords X
        pos4 = e.clientY // Update coords Y

        // Move the block
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px' // Y update the object directly
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'// X

        const elmntId = elmnt.id

        // Testing by selecting id1
        this.db.child('room').child('0').child('blocks').child(`id${elmntId}`).once('value', (snapshot) => {
          //? Update firebase so that other users will get updated positions
          console.log(snapshot.val(), 'snappy val')
          const posUpdates = {
            pos1: snapshot.val().pos3 - e.clientX,
            pos2: snapshot.val().pos4 - e.clientY,
            pos3: e.clientX,
            pos4: e.clientY
          }
          const elmntId = elmnt.id
          this.db.child('room').child('0').child('blocks').child(`id${elmntId}`).update(posUpdates)
        })

      }
    }

    // Listener for all receiving clients
    this.db.child('room').child('0').child('blocks').on('value', (snapshot) => {

      for (const key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          const el = snapshot.val()[key]
          const blockId = el.id
          const block = $(`div#${blockId}`)[0]

          // just completely update it.
          console.log('pos3', el.pos3, 'pos4', el.pos4)
          $(`div#${blockId}`).css('top', el.pos4)
          $(`div#${blockId}`).css('left', el.pos3)
        }
      }
    })

    // Close event updates
    function closeDragElement(e) {
      //! Cut the firebase listeners when client lets go
      console.log('client let go')
      // Release the user lock
      elmnt.userDragging = null

      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }


  }
}
