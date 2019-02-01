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
    // Intialize position and obj in DB
    switch (componentType) {
      case 'sticky-note':
        db.child('room').child('0').child(`blocks/${componentId}`).set({
          id: componentId,
          content: 'generated test',
          left: 250,
          top: 200,
          type: componentType
        })
        break
        case 'draw-pen-canvas':
        db.child('room').child('0').child(`blocks/${componentId}`).set({
          id: componentId,
          // content: 'generated test',
          drawLineToX: 0,
          drawLineToY: 0,
          drawMoveToX: 0,
          drawMoveToY: 0,
          left: 250,
          top: 200,
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
