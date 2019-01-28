import { Component, AfterContentInit, ElementRef, Renderer2 } from '@angular/core'
import { DragService } from './../../shared/drag.service'
import * as $ from 'jquery'
import * as uuid from 'uuid/v1'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements AfterContentInit {

  test = 'some test yolo HI'

  constructor(
    private drag: DragService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  getUniqueId() {
    return uuid()
  }

  onHeaderClick(e) {
    console.log(e.target, ' header clicked')
  }

  testFunc(e) {
    console.log(e.target.value)
  }


  ngAfterContentInit(): void {
    const stickyNote = this.el.nativeElement.querySelector('div')
    this.renderer.setAttribute(stickyNote, 'id', this.getUniqueId())

    
    console.log(this.el.nativeElement.querySelector('div'), ' hi')
    // ! cannot get pos 3 of null error coming from firebase because the id is not found.
    // ! You need to set up the id in the database by some sort of intial rendering or something.
    this.drag.dragElement(stickyNote)
  }
}
