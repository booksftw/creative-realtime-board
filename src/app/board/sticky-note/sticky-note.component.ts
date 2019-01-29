import { Component, AfterContentInit, ElementRef, Renderer2 } from '@angular/core'
import { DragService } from './../../shared/drag.service'
import * as $ from 'jquery'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements AfterContentInit {

  test = 'some test yolo HI'
  stickyId = 1

  constructor(
    private drag: DragService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterContentInit(): void {
    const stickyNote = this.el.nativeElement.querySelector('div')
    this.drag.dragElement(stickyNote)
    // this.resizable(stickyNote)
  }
}
