import { Injectable, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { BoardComponent } from './../board/board.component'
import * as uuid from 'uuid/v1'
import * as _ from '../../../node_modules/lodash'
import * as firebase from '../../../node_modules/firebase'


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  test() {
    return 'testing board service works'
  }

  onAddComponent(componentType) {
    const componentId = this.getRandomId()
    const db = firebase.database().ref()
    // Intialize in db
    switch (componentType) {
      case 'sticky-note':
        db.child('room').child('0').child(`blocks/${componentId}`).set({
          id: componentId,
          content: 'generated test',
          pos1: 0,
          pos2: 0,
          pos3: 0,
          pos4: 0,
          type: componentType
        })
        break
      // Other omponent
      default:
        break
    }
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

  getDifferenceBetweenArrays(arry1, arry2) {
    // Returns an array of numbers that don't match

    let longArray
    let shortArray
    if (arry1.length > arry2.length) {
      longArray = arry1
      shortArray = arry2
    } else {
      longArray = arry2
      shortArray = arry1
    }
    // const result = longArray
    const notInShortArray = longArray.filter(function (value) {
      return !shortArray.includes(value)
    })
    const notInLongArray = shortArray.filter(function (value) {
      return !longArray.includes(value)
    })

    return notInShortArray.concat(notInLongArray)
  }

  checkArraysAreEqual(arry1, arry2) {
    // Works with simple arrays only
    return arry1.length === arry2.length && arry1.every( (value, index) => arry2[index] === value )
  }

  convertArrayOfStringsToNumber(arry) {
    // Takes an array of strings and returns an array of numbers
    const result = []
    arry.forEach(el => {
      result.push( Number(el) )
    })
    return result
  }

  convertObjectKeysIntoArray(obj) {
    const result = []
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push(key)
      }
    }

    return result
  }

}
