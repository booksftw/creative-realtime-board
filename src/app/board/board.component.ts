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

  testGenerateStickyNote(componentId?) {
    console.log('generate sticky')
    componentId? componentId = componentId : componentId = this.boardUtil.getRandomId()
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

          this.testGenerateStickyNote(blockId)
          // const block = this.boardUtil.generateComponent(blockType, blockContent)
          // this.renderDraggableToPage(block, blockId)
        }
      }
    })


    this.db.child('room').child('0').child('registered_blocks').on('value', (snapshot) => {
                // Generate component with the ids
                // this.testGenerateStickyNote(id)

    })

  }

  ngAfterContentInit(): void { }
}
