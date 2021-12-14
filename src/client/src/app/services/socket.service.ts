import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {map, shareReplay, tap} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public indexes$!: Observable<any>;
  public message$: BehaviorSubject<string> = new BehaviorSubject('')
  constructor(private socket: Socket) {
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
  getNewMessage = () => {
    this.socket.on('message', (message: string) => {
      this.message$.next(message)
    });

    return this.message$.asObservable()
  }

  getMessage() {
    console.log(this.socket);
    return this.socket.fromEvent('message').pipe(tap((data:any) => console.log(data)));
  }


}
