import { Injectable, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { BoardComponent } from './../board/board.component'

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  test() {
    return 'testing board service works'
  }

  generateImageComponent(imgSrc) {
    const imgComponent = `<img style="width: 100%" src=${imgSrc} />` // Replace the inline styling later
    return imgComponent
  }
  generateTextComponent(text) {
    const textComponent = `<h1 class="textBlock"> ${text} </h1>`
    return textComponent
  }

  generateStickyNote(color) {
    const stickyNoteComponent = `<textarea class="sticky-note"> Nick bazzaoah god of stamina </textarea>`
    return stickyNoteComponent
  }

  generateComponent(type, content) {

    switch (type) {
      case 'text':
        // console.log('is Text')
        return this.generateTextComponent(content)
        break
      case 'image':
        // console.log('is Image')
        return this.generateImageComponent(content)
        break
      case 'sticky-note':
        return this.generateStickyNote('yellow')
        break
      default:
        break
    }
  }

  randomId() {
    return Math.floor(Math.random() * 1000) // Update this to be actually random
  }
}
