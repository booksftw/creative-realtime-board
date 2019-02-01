import { Directive, OnInit, ElementRef } from '@angular/core'
import * as Quill from '../../../node_modules/quill'

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }


  ngOnInit() {
    // console.log(this.el.nativeElement)
    // const simplemde = new SimpleMDE({ element: this.el.nativeElement })

    const quill = new Quill(this.el.nativeElement, {
      theme: 'snow'
    })
  }

}
