import { Component, ElementRef, OnInit  } from '@angular/core'
import { DragService } from './../../shared/drag.service'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit{

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
    this.drag.dragElement(stickyNote)
  }

}
