import { Component, OnInit, ElementRef, ViewChild, Renderer2, ViewChildren, AfterViewInit } from '@angular/core'
import * as firebaseStream from 'node_modules/firebase'

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit, AfterViewInit {
  // yourId
  // servers = { 'iceServers': [{ 'urls': 'stun:stun.services.mozilla.com' }, { 'urls': 'stun:stun.l.google.com:19302' }, { 'urls': 'turn:numb.viagenie.ca', 'credential': 'Zachary46!', 'username': 'znick46@hotmail.ca' }] }
  // pc = new RTCPeerConnection(this.servers)
  // config = {
  //   apiKey: 'AIzaSyBajPcoloVgJTcE44NhPLvVsqnWG9RSBEE',
  //   authDomain: 'simple-webrtc-video-chat.firebaseapp.com',
  //   databaseURL: 'https://simple-webrtc-video-chat.firebaseio.com',
  //   projectId: 'simple-webrtc-video-chat',
  //   storageBucket: 'simple-webrtc-video-chat.appspot.com',
  //   messagingSenderId: '748074977719'
  // }
  // otherFb = firebaseStream.initializeApp(this.config, 'other')

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {}


  //   const yourVideo = this.el.nativeElement.querySelector('#yourVideo')
  //   const friendsVideo = this.el.nativeElement.querySelector('#friendsVideo')
  //   const database = this.otherFb.database().ref()


  //   this.yourId = Math.floor(Math.random() * 1000000000)
  //   // tslint:disable-next-line:max-line-length
  //   this.pc.onicecandidate = (event => event.candidate ? this.sendMessage(this.yourId, JSON.stringify({ 'ice': event.candidate })) : console.log('Sent All Ice'))
  //   // @ts-ignore
  //   this.pc.onaddstream = (event => friendsVideo.srcObject = event.stream)

  //   const nzId = this.yourId
  //   const nzPc = this.pc

  //   function readMessage(data) {
  //     const yourId = nzId
  //     const pc = nzPc

  //     const msg = JSON.parse(data.val().message)
  //     const sender = data.val().sender
  //     if (sender !== yourId) {
  //       if (msg.ice !== undefined) {
  //         pc.addIceCandidate(new RTCIceCandidate(msg.ice))
  //       } else if (msg.sdp.type === 'offer') {
  //         pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
  //           .then(() => pc.createAnswer())
  //           .then(answer => pc.setLocalDescription(answer))
  //           .then(() => this.sendMessage(yourId, JSON.stringify({ 'sdp': pc.localDescription })))
  //       } else if (msg.sdp.type === 'answer') {
  //         pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
  //       }
  //     }
  //   }

  //   database.on('child_added', readMessage)

  // }

  // sendMessage(senderId, data) {
  //   const database = this.otherFb.database().ref()
  //   const msg = database.push({ sender: senderId, message: data })
  //   msg.remove()
  // }

  // showMyFace() {

  //   const yourVideo = this.el.nativeElement.querySelector('#yourVideo')

  //   navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  //     .then(stream => yourVideo.srcObject = stream)
  //     // @ts-ignore
  //     .then(stream => this.pc.addStream(stream))
  // }

  // showFriendsFace() {
  //   this.pc.createOffer()
  //     .then(offer => this.pc.setLocalDescription(offer))
  //     .then(() => this.sendMessage(this.yourId, JSON.stringify({ 'sdp': this.pc.localDescription })))
  // }
}
