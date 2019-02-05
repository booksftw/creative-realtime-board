import { Component, OnInit, AfterViewInit } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-chatmessagelist',
  templateUrl: './chatmessagelist.component.html',
  styleUrls: ['./chatmessagelist.component.css']
})
export class ChatmessagelistComponent implements OnInit, AfterViewInit {
  userDisplayName
  boardId
  messages
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(data => {
      this.boardId = data.roomId
      this.userDisplayName = data.userDisplayName
    })
  }

  ngAfterViewInit() {
    // Listen to firebase and update each view that's binded by a foreach loop
    this.messages = this.db.list(`room/${this.boardId}/messages`).valueChanges()
  }
}
