import { Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterContentInit } from '@angular/core'
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
export class BoardComponent implements OnInit, AfterContentInit {
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
    // console.log('generate sticky note', 'id', componentId)

    if (!componentId) {
      // Create new block
      componentId = this.boardUtil.getRandomId()
          // ~
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

          // ~
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

          // ~
          this.all_ids_in_view[blockId] = true

          this.testGenerateStickyNote(blockId)
          // const block = this.boardUtil.generateComponent(blockType, blockContent)
          // this.renderDraggableToPage(block, blockId)
        }
      }
    })
  }

  ngAfterContentInit(): void {

    this.db.child('room').child('0').child('registered_blocks').on('value', (snapshot) => {
      const blocksSet = snapshot.val()
      for (const key in blocksSet) {
        if (blocksSet.hasOwnProperty(key)) {
          const el = blocksSet[key]
          const blockId = el.id
          const blockType = el.type
          const blockContent = el.content
          const all_registered_ids = []

          this.db.child('room').child('0').child('registered_blocks').once('value').then((snap) => {


            // console.log('registered snap', snap.val() )
            const allRegistered = snap.val()
            console.log('allRegistered:', allRegistered);
            for (const keyReg of Object.keys(allRegistered)) {
              // if (allRegistered.hasOwnProperty(keyReg)) {
                // console.log('allregister', allRegistered[keyReg])
                // this.registeredIds[keyReg] = true
                all_registered_ids.push(allRegistered[keyReg].id)
              // }
            }
            console.log('allRegistered has', all_registered_ids.length, 'values')
            // }).then( () => {

            const all_ids_in_view_array = Object.keys(this.all_ids_in_view)
            const all_view_ids = this.boardUtil.convertArrayOfStringsToNumber(all_ids_in_view_array)
            // console.log('all view ids', all_view_ids, 'all register ids', all_registered_ids)

            console.log('BoardComponent: all-view-ids', all_view_ids, 'all-register-ids', all_registered_ids)
            // ! Get array of ids that arent on the view board and render them
            const y = this.boardUtil.getDifferenceBetweenArrays(all_view_ids, all_registered_ids)
            console.log('y:', y);


            // Generate component with the ids
          })

        }
      }
    })

  }



}
