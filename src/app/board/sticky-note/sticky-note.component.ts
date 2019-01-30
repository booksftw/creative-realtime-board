import { Component, ElementRef, OnInit  } from '@angular/core'
import { DragService } from './../../shared/drag.service'
import * as $ from 'jquery'


@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit{

  test = 'Default sticky text'
  stickyId
  pos3 = 200
  pos4 = 200

  intialPos = {
    'background-color': 'green',
    'left': this.pos3,
    'right': this.pos4,
  }


  constructor(
    private drag: DragService,
    private el: ElementRef,
    // private renderer: Renderer2,
    // private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    const stickyNote = this.el.nativeElement.querySelectorAll('div')[0]
    const jQStickyNote = $(stickyNote).css('left', 300).css('top', 1000)
    this.drag.dragElement(stickyNote)
  }

}
