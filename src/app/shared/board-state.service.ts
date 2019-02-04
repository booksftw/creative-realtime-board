import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BoardStateService {

  board = {
    activeId: 0
  }

  componentRef = {
    test: ''
  }


}
