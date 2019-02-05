import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { ActivatedRoute, Router } from '@angular/router'
import { BoardStateService } from 'src/app/shared/board-state.service'

@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.css']
})
export class ChooseRoomComponent implements OnInit {
  userDisplayName
  exisitingRooms = []
  roomSnapshotListener
  userDisplayListener
  roomName
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private boardState: BoardStateService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.userDisplayName = data.displayName
      console.log('user display name', this.userDisplayName)
    })

    this.roomSnapshotListener = this.db.list('room').snapshotChanges().subscribe(rooms => {
      const savedRooms = []
      rooms.forEach(room => {
        const roomId = room.key
        const roomData = room.payload.val()
        // @ts-ignore
        this.roomName = room.payload.val().name
        // @ts-ignore
        const roomName = room.payload.val().name
        const roomDataForView = {id: roomId, name: roomName}
        savedRooms.push(roomDataForView)
      })
      this.exisitingRooms = savedRooms
    })

  }

  onJoinRoom(id) {
    this.router.navigate(['/board'], { queryParams: { roomId: id, roomName: this.roomName, userDisplayName: this.userDisplayName } })
    // Unsubscribe to listeners
    this.roomSnapshotListener.unsubscribe()
    this.userDisplayListener.unsubscribe()
  }
  onCreateRoom() {
    const id = Math.floor(Math.random() * 1000000000000)

    this.db.object(`room/${id}`).set({
      name: 'Unicorn Room',
      blocks: {}
    })

    this.router.navigate(['/board'], { queryParams: { roomId: id, roomName: this.roomName, userDisplayName: this.userDisplayName } })
    // Unsubscribe to listeners
    this.roomSnapshotListener.unsubscribe()
    this.userDisplayListener.unsubscribe()
  }


}
