import { Directive, OnInit, ElementRef } from '@angular/core'
import * as Two from '../../../assets/js/two'

@Directive({
  selector: '[appStar]'
})
export class StarDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    const elem = this.el.nativeElement
    const params = { width: 285, height: 200 }
    const two = new Two(params).appendTo(elem)
    
    const star = two.makeStar(72, 100, 25, 50, 5)
    star.fill = 'rgb(246,249,57)'
    
    // Don't forget to tell two to render everything
    // to the screen
    two.update()

  }

}
