import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-join-game',
  templateUrl: './page-join-game.component.html',
  styleUrls: ['./page-join-game.component.scss']
})
export class PageJoinGameComponent implements OnInit {

  constructor(private socket: Socket, private router: Router) {
    this.socket.on('howdy howdy', () => {
      alert('howdy howdy')
    })
  }

  ngOnInit(): void {
  }
  name: string = ''
  joinRoom(room: string) {
    this.socket.emit('join-room', room)
    this.router.navigate(['/' + 'game-page', room])


  }

}
