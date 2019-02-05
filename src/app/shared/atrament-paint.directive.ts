import { Directive, OnInit, ElementRef, Input, AfterViewInit } from '@angular/core'
import * as Atrament from '../../assets/js/attrament-paint'
import * as firebase from '../../../node_modules/firebase'

@Directive({
  selector: '[appAtramentPaint]'
})
export class AtramentPaintDirective implements OnInit, AfterViewInit {
  // @Input() canvasTag: string
  // sketcher
  constructor(
    // private el: ElementRef
  ) { }


  ngOnInit() {
    // this.sketcher = Atrament(this.el.nativeElement, 1000, 1000, 'orange')

    // const canvas = this.el.nativeElement
    // const canvasId = this.canvasTag
    // const myImage = new Image()
    // const ctx = canvas.getContext('2d')
    // const db = firebase.database().ref()
    // db
    // .child('room')
    // .child('0')
    // .child('blocks')
    // .child(`${canvasId}`)
    // .once('value', (snap) => {
    //   myImage.src = ''
    //   myImage.onload = function () {
    //       const logo = {
    //         img: myImage,
    //         x: (canvas.width / 2) - (myImage.width / 2),
    //         y: (canvas.height / 2) - (myImage.height / 2)
    //     }
    //     ctx.drawImage(logo.img, 0, 0, logo.img.width, logo.img.height)
    //   }
    // })
  }

  ngAfterViewInit(): void {
  //   const canvas = this.el.nativeElement
  //   const canvasId = this.canvasTag
  //   const dataUrl = this.sketcher.toImage()

  //   // ~ Disabled for now - You can activate it by splitting the array sending to firebase and joining it together to render it
  //   function autoSaveToDB(canvasId) {
  //     setInterval(() => {
  //       // const dataUrl = this.sketcher.toImage()
  //       console.log('DATA URL' , dataUrl, 'save')
  //       const db = firebase.database().ref()
  //       db
  //         .child('room')
  //         .child('0')
  //         .child(`blocks/${canvasId}`)
  //         .update({
  //           content: dataUrl
  //         })
  //     }, 5000)
  //   }
  //   autoSaveToDB(dataUrl)
  // }

        // ref.putString(message).then(function (snapshot) {
        //   console.log('Uploaded a raw string!')
        // })

        //   console.log('DATA URL' , dataUrl, 'save')
        //   const db = firebase.database().ref()
        //   db
        //     .child('room')
        //     .child('0')
        //     .child(`blocks/${canvasId}`)
        //     .update({
        //       content: dataUrl
        //     })
        // }, 5000)
      // }, 3000)
    // }
    // autoSaveToDB(dataUrl, dataUrl)
    

  }
}
