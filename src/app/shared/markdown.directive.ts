import { Directive, OnInit, ElementRef } from '@angular/core'
import * as SimpleMDE from '../../../node_modules/simplemde'

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }


  ngOnInit(){
    console.log(this.el.nativeElement)
    const simplemde = new SimpleMDE({ element: this.el.nativeElement })
  }

}
