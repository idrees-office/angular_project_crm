import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private socket$: WebSocketSubject<any>;

  constructor() { 
    this.socket$ = webSocket('ws://your-websocket-url');
  }

  connect() {
    return this.socket$.asObservable();
  }

  send(message: any) {
    this.socket$.next(message);
  }

  close() {
    this.socket$.complete();
  }

}
