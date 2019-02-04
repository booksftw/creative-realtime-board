import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatmessagelist',
  templateUrl: './chatmessagelist.component.html',
  styleUrls: ['./chatmessagelist.component.css']
})
export class ChatmessagelistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Listen to firebase and update each view that's binded by a foreach loop
  }

}
