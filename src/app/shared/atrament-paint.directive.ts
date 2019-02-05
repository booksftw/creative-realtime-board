import { Directive, OnInit, ElementRef, Input, AfterViewInit } from '@angular/core'
import * as Atrament from '../../assets/js/attrament-paint'
import * as firebase from '../../../node_modules/firebase'

@Directive({
  selector: '[appAtramentPaint]'
})
export class AtramentPaintDirective implements OnInit, AfterViewInit {
  @Input() canvasTag: string
  sketcher
  constructor(
    private el: ElementRef
  ) { }


  ngOnInit() {
    // this.sketcher = Atrament(this.el.nativeElement, 1000, 1000, 'orange')

    const canvas = this.el.nativeElement
    const canvasId = this.canvasTag

    // ! Drawing Intial Sync
    // ! The data url needs to be sup in afterviewInit
    const myImage = new Image()
    const ctx = canvas.getContext('2d')

    // ! Listen to the firebase updates in the component
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
    const canvas = this.el.nativeElement
    const canvasId = this.canvasTag
    const dataUrl = this.sketcher.toImage()

    // ~ Disabled for now - You can activate it by splitting the array sending to firebase and joining it together to render it
    // Send to firebase storage because file is big
    console.log('howdy')

    const storageRef = firebase.storage().ref() // .child(`images/${boardIdChangeMe}`)


    // storageRef.putString(dataUrl, 'data_url').then(function(snapshot) {
    //   console.log('Uploaded a data_url string!')
    // })

    // Data URL string
    const message = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB'
    storageRef.putString(message, 'data_url').then(function(snapshot) {
      console.log('Uploaded a data_url string!')
    })

    function autoSaveToDB(canvasId, imgData) {
      const boardIdChangeMe = 1
      setInterval( () => {
        console.log('interva start')
        // Create a root reference
        // const storageRef = firebase.storage().ref() // .child(`images/${boardIdChangeMe}`)
        // console.log(storageRef, '<<<<<<<<<<<')

        // storageRef.putString(`${imgData}`, 'base64').then(function (snapshot) {
        //   console.log('Uploaded a raw string !')
        // })

        // const message = 'This is my message.';

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
      }, 3000)
    }
    autoSaveToDB(dataUrl, dataUrl)
    

  }
}
