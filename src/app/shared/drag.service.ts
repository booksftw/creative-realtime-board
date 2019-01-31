import { Injectable } from '@angular/core'
import * as firebase from '../../../node_modules/firebase'
import * as _ from '../../assets/third_party/lodash'
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class DragService {

  db = firebase.database().ref()

  constructor() { }

  dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    const dragHeader = elmnt.childNodes[0]
    dragHeader.addEventListener('mousedown', dragMouseDown)
    // elmnt.addEventListener('mousedown', dragMouseDown)

    function dragMouseDown(e) {
      console.log('drag mouse called')
      const blockId = elmnt.id
      const userId = this.sessionId
      elmnt.userDragging = userId
      e = e || window.event
      e.preventDefault()

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
          const throttleElementDrag = _.throttle(elementDrag, 0)
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
        // elmnt.style.top = (elmnt.offsetTop - pos2) + 'px' // Y update the object directly
        // elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'// X

        const elmntId = elmnt.id
        // console.log('elmntID', elmnt.id)

        // Testing by selecting id1
        this.db.child('room').child('0').child(`blocks/${elmntId}`).once('value', (snapshot) => {
          // console.log('snapshot', snapshot.val(), snapshot)
          const posUpdates = {
            pos1: snapshot.val().pos3 - e.clientX,
            pos2: snapshot.val().pos4 - e.clientY,
            pos3: e.clientX,
            pos4: e.clientY
          }
          // const elmntId = elmnt.id
          this.db.child('room').child('0').child(`blocks/${elmntId}`).update(posUpdates)
        })

      }
    }

    // Listener for all receiving clients
    // this.db.child('room').child('0').child('blocks').on('value', (snapshot) => {

    //   for (const key in snapshot.val()) {
    //     if (snapshot.val().hasOwnProperty(key)) {
    //       const el = snapshot.val()[key]
    //       const blockId = el.id
    //       const block = $(`div#${blockId}`)[0]

    //       // just completely update it.
    //       // $(`div#${blockId}`).css('top', el.pos4)
    //       // $(`div#${blockId}`).css('left', el.pos3)
    //     }
    //   }
    // })

    // Close event updates
    function closeDragElement(e) {
      // ! Cut the firebase listeners when client lets go
      // Release the user lock
      elmnt.userDragging = null

      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
