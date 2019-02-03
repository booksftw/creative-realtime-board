<<<<<<< HEAD
import { Directive, OnInit, ElementRef } from '@angular/core'
import * as SimpleMDE from '../../../node_modules/simplemde'
=======
import { Directive, OnInit, ElementRef, HostListener } from '@angular/core'
import * as Quill from '../../../node_modules/quill'
import * as firebase from '../../../node_modules/firebase'
>>>>>>> integrate/image_upload

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit {

<<<<<<< HEAD
=======
  quill

>>>>>>> integrate/image_upload
  constructor(
    private el: ElementRef
  ) { }

<<<<<<< HEAD

  ngOnInit(){
    console.log(this.el.nativeElement)
    const simplemde = new SimpleMDE({ element: this.el.nativeElement })
=======
  @HostListener('keydown', ['$event']) onKeyDown (e) {
    console.log('key tpyesd', e.target.innerText, this.el.nativeElement.innerHTML[0])

    const delta = this.quill.getContents()
    const textContent = delta.ops[0].insert
    console.log('delta', delta.ops[0].insert + 'testing')

    const editorHtml = e.target.innerHTML
    const editorId = this.el.nativeElement.parentNode.id
    console.log('editor id host listener', editorId)
    const db = firebase.database().ref()
    db.child('room')
      .child('0')
      .child('blocks')
      .child(editorId)
      .update({
        content:  textContent
      })

      console.log(this.el.nativeElement.parentNode)
      db
      .child('room')
      .child('0')
      .child('blocks')
      .child(editorId)
      .once('value', snap => {
        console.log('snap content', snap.val().content)
        this.quill.updateContents([
          { insert: snap.val().content },
        ])
      })


  }

  @HostListener('click', ['$event']) onSave(e) {

  }

  ngOnInit() {
    this.quill = new Quill(this.el.nativeElement, {
      theme: 'bubble',
    })
    // console.log(this.el.nativeElement)
    // const simplemde = new SimpleMDE({ element: this.el.nativeElement })



    // const newContent = delta.ops[0].insert + 'testing new content'
>>>>>>> integrate/image_upload
  }

}
