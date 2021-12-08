import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-page-join-game',
  templateUrl: './page-join-game.component.html',
  styleUrls: ['./page-join-game.component.scss']
})
export class PageJoinGameComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit(): void {
  }
  name: string = ''
  joinRoom(room: string) {
    this.socket.emit('join-room', room)

  }

}
