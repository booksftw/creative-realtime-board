import { AngularFireDatabase } from '@angular/fire/database'
import { Component, AfterContentInit, ElementRef, Renderer2, OnInit, ViewChild      } from '@angular/core'
import { DragService } from './../../shared/drag.service'
import * as $ from 'jquery'
import {catchError, flatMap} from 'rxjs/operators'

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit {

  test = 'Default sticky text'
  stickyId = 1

  constructor(
    private drag: DragService,
    private el: ElementRef,
    private renderer: Renderer2,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    // const stickyNote = this.el.nativeElement.querySelectorAll('div')[0]
    // this.drag.dragElement(stickyNote)
  }




}
