import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { UserMessage } from './config';

@Injectable()
export class WebsocketService {
  constructor() { }

  private subject: Subject<MessageEvent>;

  public connect(url:string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected to: " + url);
    }
    return this.subject;
  }

  private create(url:string): Subject<MessageEvent> {
    console.log( 'websocket.service: create: '+url)
    let ws: WebSocket = new WebSocket(url);

    //
    //      OBSERVABLE
    //
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      console.log('websocket.service: Observable.create');
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    })

    //
    //      OBSERVER OBJECT - A handler for receiving observable notifications
    //
    let observer = {
      next: (data: UserMessage) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log('observer send: data: ', data);
          ws.send(JSON.stringify(data));
        } else {
          console.log( "Websocket is NOT open!!")
          this.create( url )
        }
      },
      error: (err) => {
        console.log( 'observer: error: ', err)
      }
    }
    // A Subject is an Observer AND observable
    return Subject.create(observer, observable);
  }

}