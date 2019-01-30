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

    // const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
    // const component = this.entry.createComponent(stickyNoteFactory)
    // component.instance.stickyId = 2132132132
  }

  testGenerateStickyNote(componentId?) {
    if (!componentId) {
      // Create new block
      //
      componentId = this.boardUtil.getRandomId()
      this.all_ids_in_view[componentId] = true

      // Register the updated view state online
      this.db.child('room').child('0').child(`registered_blocks`).child(`${componentId}`).update({
        id: componentId,
        content: 'generated test',
        type: 'sticky-note'
      })

      // Create the component and pass data down
      const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
      const component = this.entry.createComponent(stickyNoteFactory)
      component.instance.test = 'CREATES NEW STICKY'
      component.instance.stickyId = componentId
    } else {
      // Render Existing block
      //
      console.log('Render exisiting block. Component Id:', componentId)

      const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
      const component = this.entry.createComponent(stickyNoteFactory)

      console.log('component instance', component.instance)
      component.instance.test = 'Howdy THIS CODE RENDERS EXISTING'
      component.instance.stickyId = componentId


      this.db.child('room').child('0').child(`registered_blocks`).child(`${componentId}`).update({
        id: componentId,
        content: 'generated test',
        type: 'sticky-note'
      })

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

    // this.testGenerateComponent('1111111')
    // const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
    // const component = this.entry.createComponent(stickyNoteFactory)
    // component.instance.stickyId = 21321321321321

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

          this.all_ids_in_view[blockId] = true
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
          const all_registered_ids = []

          this.db.child('room').child('0').child('registered_blocks').once('value').then((snap) => {

            const allRegistered = snap.val()
            for (const keyReg of Object.keys(allRegistered)) {
                all_registered_ids.push(allRegistered[keyReg].id)
            }

            const all_ids_in_view_array = Object.keys(this.all_ids_in_view)
            const all_view_ids = this.boardUtil.convertArrayOfStringsToNumber(all_ids_in_view_array)

            const pending_view_ids = this.boardUtil.getDifferenceBetweenArrays(all_view_ids, all_registered_ids)
            // IF view ids different form register ids fill in the view ids and stop.
            const isViewAndRegisterSync = this.boardUtil.checkArraysAreEqual(all_view_ids, all_registered_ids)
            
            console.log('registered block fired')
            if (!isViewAndRegisterSync) {
              pending_view_ids.forEach(id => {
                this.all_ids_in_view[id] = true
                // Generate component with the ids
                this.testGenerateStickyNote(id)
              })
            }

          })

        }
      }
    })

  }

  ngAfterContentInit(): void {

    // this.db.child('room').child('0').child('registered_blocks').on('value', (snapshot) => {
    //   const blocksSet = snapshot.val()
    //   for (const key in blocksSet) {
    //     if (blocksSet.hasOwnProperty(key)) {
    //       const el = blocksSet[key]
    //       const blockId = el.id
    //       const blockType = el.type
    //       const blockContent = el.content
    //       const all_registered_ids = []

    //       this.db.child('room').child('0').child('registered_blocks').once('value').then((snap) => {

    //         const allRegistered = snap.val()
    //         for (const keyReg of Object.keys(allRegistered)) {
    //             all_registered_ids.push(allRegistered[keyReg].id)
    //         }
    //         console.log('allRegistered has', all_registered_ids.length, 'values')

    //         const all_ids_in_view_array = Object.keys(this.all_ids_in_view)
    //         const all_view_ids = this.boardUtil.convertArrayOfStringsToNumber(all_ids_in_view_array)

    //         console.log('BoardComponent: all-view-ids', all_view_ids, 'all-register-ids', all_registered_ids)
    //         // ! Get array of ids that arent on the view board and render them
    //         const pending_view_ids = this.boardUtil.getDifferenceBetweenArrays(all_view_ids, all_registered_ids)
    //         console.log('pending_view_ids:', pending_view_ids)

    //         pending_view_ids.forEach( id => {
    //           // Generate component with the ids
    //           this.testGenerateStickyNote(id)
    //           // this.testGenerateComponent(id)
    //         })
    //       })

    //     }
    //   }
    // })

  }



}
