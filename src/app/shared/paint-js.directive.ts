import { Directive, OnInit, ElementRef, HostListener } from '@angular/core'
// import { PaperScope, Project, Path, Point } from 'paper';
import { PaperScope, Project, Path, Point, paper } from 'paper';
// import '../../../node_modules/paper'

@Directive({
  selector: '[appPaintJs]'
})
export class PaintJsDirective implements OnInit {

  scope: PaperScope
  project: Project



  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {






    // * this works
    // const canvas = this.el.nativeElement
    // paper.setup(canvas)

    // var path = new paper.Path();
		// // Give the stroke a color
		// path.strokeColor = 'black';
		// var start = new paper.Point(100, 100);
		// // Move to start and draw a line from there
		// path.moveTo(start);
		// // Note that the plus operator on Point objects does not work
		// // in JavaScript. Instead, we need to call the add() function:
		// path.lineTo(start.add([ 200, -50 ]));
		// // Draw the view now:
		// paper.view.draw();

  }

}
