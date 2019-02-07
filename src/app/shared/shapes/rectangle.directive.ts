import { Directive, ElementRef, OnInit } from '@angular/core'
import * as Two from '../../../assets/js/two'

@Directive({
  selector: '[appRectangle]'
})
export class RectangleDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    const elem = this.el.nativeElement
    const params = { width: 285, height: 200 }
    const two = new Two(params).appendTo(elem)
    
    const rect = two.makeRectangle(72, 100, 100, 100)
    rect.fill = 'rgba(0,0,0,0)'

    // Don't forget to tell two to render everything
    // to the screen
    two.update()
  }

}
