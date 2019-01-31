import { Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core'
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
export class BoardComponent implements OnInit {
  db
  itemsRef
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef

  constructor(
    private dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
    private resolver: ComponentFactoryResolver,
  ) { }

  addComponent(componentType) {
    // Silence is golden
    this.boardUtil.onAddComponent(componentType)
  }



  ngOnInit() {
    // Render Exisiting Components
    this.db = firebase.database().ref()
    this.db.child('room').child('0').child('blocks').on('child_added', (snapshot) => {
      const id = snapshot.val().id
      const componentType = snapshot.val().type
      const leftPos = snapshot.val().pos3
      const topPos  = snapshot.val().pos4
      switch (componentType) {
        case 'sticky-note':
          const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
          const stickyComponent = this.entry.createComponent(stickyNoteFactory)
          stickyComponent.instance.stickyId = snapshot.val().id
          stickyComponent.instance.content = snapshot.val().content
          stickyComponent.instance.pos3 = leftPos
          stickyComponent.instance.pos4 = topPos
          break
        default:
          break
      }

    })
    // Important: This forces the app to generate components properly
    this.dbAf.list('room/0/blocks').valueChanges().subscribe((e) => { })

    // this.content = this.afDb.object(`room/0/blocks/${this.stickyId}/content`).valueChanges()
    // this.content = this.dbAf.object(`room/0/blocks`).valueChanges().subscribe( (e) => {
      
    // } )

  }

}
