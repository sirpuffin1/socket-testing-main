import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketioService } from 'src/app/services/socket.service';



export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  name!: string;
  newMessage!: string;
  messageList: string[] = []
  display: boolean = true;
  username: string = ''

  constructor(private socketService: SocketioService, private cd: ChangeDetectorRef) { }
  ngOnDestroy(): void {
      console.log('destroy')
  }
  ngOnInit(): void {
    console.log('init')
    this.socketService.getNewMessage().subscribe((message) => {
      // this.messageList.push(message);
      // this.cd.detectChanges();
    })
    this.socketService.getMessage().subscribe((message) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
      this.socketService.sendMessage(this.newMessage)
      console.log(this.newMessage)
      console.log(this.messageList)
      this.newMessage = ''
  }
  showDialog() {
    this.display = false;
  }

}


