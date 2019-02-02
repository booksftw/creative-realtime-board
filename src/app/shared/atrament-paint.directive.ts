import { Directive, OnInit, ElementRef } from '@angular/core'
import * as Atrament from '../../assets/js/attrament-paint'
import * as firebase from '../../../node_modules/firebase'

@Directive({
  selector: '[appAtramentPaint]'
})
export class AtramentPaintDirective implements OnInit {
  sketcher
  constructor(
    private el: ElementRef
  ) { }


  ngOnInit() {
    this.sketcher = new Atrament(this.el.nativeElement)
    this.sketcher = Atrament('#mySketcher', 500, 500, 'black')

    

    // ! Drawing Sync - Work in progress
    // const myImage = new Image()
    // myImage.src = 'https://www.catster.com/wp-content/uploads/2018/05/A-gray-cat-crying-looking-upset.jpg'

    // const canvas = this.el.nativeElement
    // const ctx = canvas.getContext('2d')
    // console.log('canvas', canvas, 'ctx', ctx)
    // ctx.getContext('2d').drawImage(myImage,  33, 71, 104, 124, 21, 20, 87, 104)

    setInterval(() => {
      // const db =  firebase.database().ref()
      // const canvas = this.el.nativeElement
      // const dataUrl = canvas.toDataURL()
      // const canvasId = this.el.nativeElement.className
      // console.log(this.el.nativeElement.className, dataUrl)
      // db
      //   .child('room')
      //   .child('0')
      //   .child(`blocks/${canvasId}`)
      //   .update({
      //     content: dataUrl
      //   })
      //we have to get the dataURL of the image
      const dataURL = this.sketcher.toImage()
      //then we can, for instance, open a new window with it
      const img = new Image()
      img.src = dataURL

      this.sketcher.getContext('2d').drawImage(img)

      console.log(img)

    }, 5000)
  }
}
