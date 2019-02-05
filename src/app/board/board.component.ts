import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { BoardService } from './../shared/board.service'
import { BoardStateService } from './../shared/board-state.service'
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
import { ActivatedRoute, Router } from '@angular/router'
import { VideoStreamComponent } from './video-stream/video-stream.component'
import { DrawCircleComponent } from './draw-circle/draw-circle.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  db
  itemsRef
  enableDeleteComponent = false
  // Todo Set this to false for production it's set to false for development
  show = false
  boardId
  userDisplayName
  roomName

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef

  constructor(
    private dbAf: AngularFireDatabase,
    private boardUtil: BoardService,
    private resolver: ComponentFactoryResolver,
    private state: BoardStateService,
    private route: ActivatedRoute
  ) { }

  onChatClick() {
    this.show = !this.show
  }

  addComponent(componentType) {
    console.log('board id ', this.boardId)
    // Silence is golden
    this.boardUtil.onAddComponent(componentType, this.boardId)
  }

  ngOnInit() {

    this.route.queryParams.subscribe(data => {
      this.boardId = data.roomId
      console.log(data, data.roomName)
      this.roomName = data.roomName
      this.userDisplayName = data.userDisplayName
      console.log('user board id', this.boardId)
    })



  }

  ngAfterViewInit() {
        // Render Exisiting Components
        this.db = firebase.database().ref()
        this.db.child('room').child(`${this.boardId}`).child('blocks').on('child_added', (snapshot) => {
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
              stickyComponent.instance.boardId = this.boardId
              break
            case 'draw-pen-canvas':
            // ! Deprecated - replaced by altra paint - Not fully supported
              // Skipped boardId support
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
              drawShape.instance.boardId = this.boardId
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
              textComponent.instance.boardId = this.boardId
              break
            case 'atra-paint-canvas':
            const altraPaintFactory = this.resolver.resolveComponentFactory(AltraPaintComponent)
            const altraPaintComponent = this.entry.createComponent(altraPaintFactory)
            this.state.componentRef[id] = altraPaintComponent
            altraPaintComponent.instance.canvasId = snapshot.val().id
            // textComponent.instance.canvasData = snapshot.val().content
            altraPaintComponent.instance.leftX = leftPos
            altraPaintComponent.instance.topY = topPos
            // altraPaintComponent.instance.compRef = altraPaintComponent
            altraPaintComponent.instance.boardId = this.boardId
            break
            case 'video-stream-frame':
              const videoFrameFactory = this.resolver.resolveComponentFactory(VideoStreamComponent)
              const videoFrameComponent = this.entry.createComponent(videoFrameFactory)
              this.state.componentRef[id] = videoFrameComponent
              videoFrameComponent.instance.vidFrameId = snapshot.val().id
              // textComponent.instance.canvasData = snapshot.val().content
              videoFrameComponent.instance.leftX = leftPos
              videoFrameComponent.instance.topY = topPos
              videoFrameComponent.instance.boardId = this.boardId
              break
            case 'draw-circle':
              const drawCircleFactory = this.resolver.resolveComponentFactory(DrawCircleComponent)
              const drawCircle = this.entry.createComponent(drawCircleFactory)
              this.state.componentRef[id] = drawCircle
              drawCircle.instance.shapeId = snapshot.val().id
              drawCircle.instance.leftX = leftPos
              drawCircle.instance.topY = topPos
              drawCircle.instance.boardId = this.boardId
            break
            default:
              break
          }
        })
        // Important: This forces the app to generate components properly
        this.dbAf.list(`room/${this.boardId}/blocks`).valueChanges().subscribe((e) => { })
  }

}
