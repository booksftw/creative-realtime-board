import { Directive, OnInit, ElementRef, HostListener } from '@angular/core'
import * as Quill from '../../../node_modules/quill'
import * as firebase from '../../../node_modules/firebase'

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit {

  quill

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keydown', ['$event']) onKeyDown (e) {
    console.log('key tpyesd', e.target.innerText, this.el.nativeElement.innerHTML[0])
    const editorHtml = e.target.innerHTML
    const editorId = this.el.nativeElement.parentNode.id
    const db = firebase.database().ref()
    db.child('room')
      .child('0')
      .child('blocks')
      .child(editorId)
      .update({
        content:  e.target.innerHTML
      })

    db
    .child('room')
    .child('0')
    .child('blocks')
    .child(editorId)
    .once('value', snap => {
      // this.quill.setText([
      //   { insert: snap.val().content },
      // ])
      // this.quill.clipboard.dangerouslyPasteHTML(snap.val().content)
      this.el.nativeElement.innerHTML = 'HI'

    })

  }

  @HostListener('click', ['$event']) onSave(e) {

  }

  ngOnInit() {
    // console.log(this.el.nativeElement)
    // const simplemde = new SimpleMDE({ element: this.el.nativeElement })

    this.quill = new Quill(this.el.nativeElement, {
      theme: 'bubble',
    })

    var delta = this.quill.getContents()
    console.log('delta', delta.ops[0].insert + 'testing')

    // const newContent = delta.ops[0].insert + 'testing new content'
  }

}
