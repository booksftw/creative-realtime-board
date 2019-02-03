import { Component, Renderer2, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { BoardService } from './../shared/board.service'
import { BoardStateService } from './../shared/board-state.service';
// import { DragService } from './../shared/drag.service'
import * as $ from 'jquery'
// import * as _ from '../../assets/third_party/lodash'
import * as _ from '../../../node_modules/lodash'
import * as firebase from '../../../node_modules/firebase'
import { StickyNoteComponent } from './sticky-note/sticky-note.component'
import { DrawPenComponent } from './draw-pen/draw-pen.component'
import { DrawShapesComponent } from './draw-shapes/draw-shapes.component'
import { TextEditorComponent } from './text-editor/text-editor.component'
import { AltraPaintComponent } from './altra-paint/altra-paint.component'
import { PaperPaintComponent } from './paper-paint/paper-paint.component'



// import { interval } from 'rxjs'
// import { throttle } from 'rxjs/operators'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  db
  itemsRef
  enableDeleteComponent = false
  // Todo Set this to false for production it's set to false for development
  show = true

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef

  constructor(
    private dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private state: BoardStateService
  ) { }

  onChatClick() {
    this.show = !this.show
  }

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
      const leftPos = snapshot.val().left
      const topPos  = snapshot.val().top
      switch (componentType) {
        case 'sticky-note':
          const stickyNoteFactory = this.resolver.resolveComponentFactory(StickyNoteComponent)
          const stickyComponent = this.entry.createComponent(stickyNoteFactory)
          this.state.componentRef[id] = stickyComponent
          stickyComponent.instance.stickyId = snapshot.val().id
          stickyComponent.instance.content = snapshot.val().content
          stickyComponent.instance.leftX = leftPos
          stickyComponent.instance.topY = topPos
          break
        case 'draw-pen-canvas':
        // ! Deprecated - replaced by altra paint
          const drawPenCanvasFactory = this.resolver.resolveComponentFactory(DrawPenComponent)
          const drawPenCanvas = this.entry.createComponent(drawPenCanvasFactory)
          this.state.componentRef[id] = drawPenCanvas
          drawPenCanvas.instance.canvasId = snapshot.val().id
          drawPenCanvas.instance.leftX = leftPos
          drawPenCanvas.instance.topY = topPos
          break
        case 'draw-shape':
          const drawShapeFactory = this.resolver.resolveComponentFactory(DrawShapesComponent)
          const drawShape = this.entry.createComponent(drawShapeFactory)
          this.state.componentRef[id] = drawShape
          drawShape.instance.shapeId = snapshot.val().id
          drawShape.instance.leftX = leftPos
          drawShape.instance.topY = topPos
          break
        case 'text-editor':
          console.log('text editors')
          const textEditorFactory = this.resolver.resolveComponentFactory(TextEditorComponent)
          const textComponent = this.entry.createComponent(textEditorFactory)
          this.state.componentRef[id] = textComponent
          textComponent.instance.textId = snapshot.val().id
          textComponent.instance.content = snapshot.val().content
          textComponent.instance.leftX = leftPos
          textComponent.instance.topY = topPos
          break
        case 'atra-paint-canvas':
        const altraPaintFactory = this.resolver.resolveComponentFactory(AltraPaintComponent)
        const altraPaintComponent = this.entry.createComponent(altraPaintFactory)
        this.state.componentRef[id] = altraPaintComponent
        altraPaintComponent.instance.canvasId = snapshot.val().id
        // textComponent.instance.canvasData = snapshot.val().content
        altraPaintComponent.instance.leftX = leftPos
        altraPaintComponent.instance.topY = topPos
        altraPaintComponent.instance.compRef = altraPaintComponent
        break
        default:
          break
      }
    })
    // Important: This forces the app to generate components properly
    this.dbAf.list('room/0/blocks').valueChanges().subscribe((e) => { })

  }

}
