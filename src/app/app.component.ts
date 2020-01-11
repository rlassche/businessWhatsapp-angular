import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { CHAT_URL, UserMessage } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {
  public chatMessage:UserMessage = {
    author: 'tutorialedge',
    message: 'this is a test message from the client'
  }
  title = 'Angular 8 with rxjs and Websockets';
  chat_url:string;
  wsResponse:string = '';
  connectionIsOpen = false;
  constructor(private chatService: ChatService) {
      this.justChat( chatService )
  }
  ngOnInit(){
    this.chat_url = CHAT_URL;
  }

  justChat(chatService: ChatService) {
    chatService.messages.subscribe(
      (msg: MessageEvent) => {
        let user_msg:UserMessage = JSON.parse(msg.data);
        //console.log("Response from server (MessageEvent, column data): ", msg.data);
        //console.log("MessageEvent type: (MessageEvent, column type): ", msg.type);
        //console.log("MessageEvent origin: (MessageEvent, column origin): ", msg.origin);
        //console.log( "UserMessage:", user_msg )
        //let obj = JSON.parse( msg.data)
        //let txt = JSON.parse( obj.text)
        if (msg.type == 'message') {
          console.log("Response from server: ", msg );
          this.wsResponse = user_msg.author + ' - ' + user_msg.message + '\n' + this.wsResponse
        } else {
          console.log("Response: ", msg)
          this.wsResponse += 'huh????' + msg;
        }
      },
      (err: Event) => {
        if (err.type == 'error') {
          console.log("ERROR with url: ", err.currentTarget['url'])
        } else {
          console.log("ERROR : ", err)
        }
      },
      (a => { this.connectionIsOpen = false;  this.chatService.reconnect() ; console.log("COMPLETE") }));
  }

  sendMsg( ) {
    this.chatService.messages.next(this.chatMessage);
  }
}
