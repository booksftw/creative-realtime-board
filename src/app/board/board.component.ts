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

    // ~ Render the blocks and their state from firebase
    this.db = firebase.database().ref()

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
