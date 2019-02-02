import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appGarbage]'
})
export class GarbageDirective {

  @HostListener('drop' , ['$event']) ondragover(e) {
    console.log('drag over', e)
  }

  constructor() { 

    console.log('garbage construct')
  }

}
