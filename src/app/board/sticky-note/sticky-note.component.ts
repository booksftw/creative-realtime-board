import { Component, ElementRef, OnInit, OnChanges      } from '@angular/core'
import { DragService } from './../../shared/drag.service'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit, OnChanges {

  test = 'Default sticky text'
  stickyId

  constructor(
    private drag: DragService,
    private el: ElementRef,
    // private renderer: Renderer2,
    // private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    const stickyNote = this.el.nativeElement.querySelectorAll('div')[0]
    console.log('stickyNote', stickyNote)
    this.drag.dragElement(stickyNote)
  }

  ngOnChanges() {
    console.log('sticky on changes')
  }

}
