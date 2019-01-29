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
  all_ids_in_view = {}

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
      // Create
    if (!componentId) {
      componentId = this.boardUtil.getRandomId()
    }

      // ! Problem: when this is called it generates a new random id so that it's never matching
      const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
      const component = this.entry.createComponent(stickyNoteFactory)

      if (!componentId) {
        console.log('id NOT PROVIDED GENERATING RANDOM')
        // componentId = this.boardUtil.getRandomId()
      }
      component.instance.test = 'Howdy'
      console.log(component.instance, 'component instance')
      component.instance.stickyId = componentId //componentId

      this.all_ids_in_view[componentId] = true

      this.db = firebase.database().ref()
      // set position
      this.db.child('room').child('0').child(`blocks/${componentId}`).set({
        id: componentId,
        content: 'generated test',
        pos1: 0,
        pos2: 0,
        pos3: 0,
        pos4: 0,
        type: 'sticky-note'
      }).then( () => {
      })

      this.db.child('room').child('0').child(`registered_blocks`).child(`${componentId}`).update({
        id: componentId,
        content: 'generated test',
        type: 'sticky-note'
      })


    }

  

  ngOnInit() {
    // ~ Render the blocks and their state from firebase
    this.db = firebase.database().ref()


    this.db.child('room').child('0').child('registered_blocks').once('value', (snapshot) => {
      const blockObj = snapshot.val()
      console.log(blockObj)

      for (const key in blockObj) {
        if (blockObj.hasOwnProperty(key)) {
          const element = blockObj[key]
          this.testGenerateStickyNote(element.id)
          
        }
      }
    })

      this.db.child('room').child('0').child('registered_blocks').on('value', (snapshot) => {
        const blockObj = snapshot.val()
      })


  }



}
