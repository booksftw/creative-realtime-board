import { Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core'
import { StickyNoteComponent } from './sticky-note/sticky-note.component'
import { AngularFireDatabase } from '@angular/fire/database'
import { BoardService } from './../shared/board.service'
import { DragService } from './../shared/drag.service'
import * as $ from 'jquery'
// import * as _ from '../../assets/third_party/lodash'
import * as _ from '../../../node_modules/lodash'
import * as firebase from '../../../node_modules/firebase'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  db
  all_ids_in_view = {}
  registeredIds = {}

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef

  constructor(
    private dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
    private renderer: Renderer2,
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private drag: DragService
  ) {
  }
  
  testGenerateComponent(id) {
    console.log('test generating componenet')
  }

  testGenerateStickyNote(componentId) {
    console.log('generate sticky note', 'id', componentId)


    // ! IF THIS ID IS ALREADY USED ONCE DON'T CREATE A SECOND COMPONENT WITH THE SAME ID
    // ! and this function is getting called many times



    if (!componentId) {
      // Create new block
      componentId = this.boardUtil.getRandomId()
          //~
    this.all_ids_in_view[componentId] = true

    this.db.child('room').child('0').child(`registered_blocks`).child(`${componentId}`).update({
      id: componentId,
      content: 'generated test',
      type: 'sticky-note'
    })
      

      const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
      const component = this.entry.createComponent(stickyNoteFactory)
      component.instance.test = 'Howdy'
      component.instance.stickyId = componentId
    } else {
      // Render Existing block

          //~
    this.all_ids_in_view[componentId] = true

    this.db.child('room').child('0').child(`registered_blocks`).child(`${componentId}`).update({
      id: componentId,
      content: 'generated test',
      type: 'sticky-note'
    })

      const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
      const component = this.entry.createComponent(stickyNoteFactory)
      component.instance.test = 'Howdy'
      component.instance.stickyId = componentId

    }



      this.db = firebase.database().ref()
      // set intial position
      this.db.child('room').child('0').child(`blocks/${componentId}`).set({
        id: componentId,
        content: 'generated test',
        pos1: 0,
        pos2: 0,
        pos3: 0,
        pos4: 0,
        type: 'sticky-note'
      })


    
      console.log('in add to func', componentId)


    }

  ngOnInit() {
    // ~ Render the blocks and their state from firebase
    this.db = firebase.database().ref()

    this.db.child('room').child('0').child('blocks').once('value', (snapshot) => {
      const blocksSet = snapshot.val()
      for (const key in blocksSet) {
        if (blocksSet.hasOwnProperty(key)) {
          const el = blocksSet[key]
          const blockId = el.id
          const blockType = el.type
          const blockContent = el.content

          //~
          this.all_ids_in_view[blockId] = true

          this.db.child('room').child('0').child(`registered_blocks`).child(`${componentId}`).update({
            id: blockId,
            content: 'generated test',
            type: 'sticky-note'
          })

          this.testGenerateStickyNote(blockId)
          // const block = this.boardUtil.generateComponent(blockType, blockContent)
          // this.renderDraggableToPage(block, blockId)
        }
      }
    })

      this.db.child('room').child('0').child('registered_blocks').on('value', (snapshot) => {
        const blocksSet = snapshot.val()
        for (const key in blocksSet) {
          if (blocksSet.hasOwnProperty(key)) {
            const el = blocksSet[key]
            const blockId = el.id
            const blockType = el.type
            const blockContent = el.content

            this.db.child('room').child('0').child('registered_blocks').once('value', (snapshot) => {
              // console.log('registered snap', snapshot.val() )
              const allRegistered = snapshot.val()
              for (const key in allRegistered) {
                if (allRegistered.hasOwnProperty(key)) {
                  this.registeredIds[key] = true
                }
              }
            })

            const all_view_ids = this.boardUtil.convertObjectKeysIntoArray(this.all_ids_in_view) //Object.keys(this.all_ids_in_view)
            const all_registered_ids = this.boardUtil.convertObjectKeysIntoArray(this.registeredIds) //Object.keys(this.registeredIds)
            const y = this.boardUtil.getDifferenceBetweenArrays(all_view_ids, all_registered_ids)
            // ! If they're already on the board don't call them
            // ! Only call the new ones
            console.log('this all in views', this.all_ids_in_view)
            console.log('all in views', all_view_ids)
            console.log('registered fb', all_registered_ids)
            console.log('testing dif func', y)

            // this.testGenerateStickyNote(blockId)
            // const block = this.boardUtil.generateComponent(blockType, blockContent)
            // this.renderDraggableToPage(block, blockId)
          }
        }
      })


  }



}
