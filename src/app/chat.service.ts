import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { CHAT_URL, UserMessage } from './config';


@Injectable()
export class ChatService {
  public messages

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<MessageEvent>>wsService
      .connect(CHAT_URL)
  }

  reconnect() {
    this.messages = <Subject<MessageEvent>>this.wsService
      .connect(CHAT_URL)
  }
}
