import { Injectable, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { BoardComponent } from './../board/board.component'
import * as uuid from 'uuid/v1'
import * as _ from '../../../node_modules/lodash'



@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  test() {
    return 'testing board service works'
  }

  generateToolBar() {
    const toolBar = `<div class="toolbarContainer">
                      <ul class="toolbar">
                        <li><i class="far fa-square"></i></li>
                        <li><i class="fas fa-text-width"></i></li>
                        <li><i class="far fa-sticky-note"></i></li>
                        <li><i class="fas fa-eraser"></i></li>
                        <li><i class="far fa-image"></i></li>
                      </ul>
                    </div>
                  `
  return toolBar
  }

  generateImageComponent(imgSrc) {
    const imgComponent = `<img style="width: 100%" src=${imgSrc} />`
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

  getRandomId() {
      return Math.floor(Math.random() * 1000) // uuid()
  }

  // ~ The built-in api functions don't work for me so I built my own
  getDifferenceBetweenArrays(arry1, arry2) {
    // Returns an array of items that don't match
    let longArray = []
    let shortArray = []
    if (arry1.length > arry2.length) {
      longArray = arry1
      shortArray = arry2
    } else {
      longArray = arry2
      shortArray = arry1
    }
    const result = longArray

    longArray.forEach( (item1, i) => {
      shortArray.forEach( item2 => {
        // Match item1 against item2
        if (item1 === item2) {
          result.splice(i, 1)
        }
      })
    })
    return result
  }

  convertObjectKeysIntoArray(obj) {
    const result = []
    console.log('the obj from service', obj)
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push(key)
      }
    }
    return result
  }

}
