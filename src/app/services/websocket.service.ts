import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private websocket: WebSocket | null = null;
  private messages: Subject<any> = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.websocket = new WebSocket('ws://localhost:8080/');

    this.websocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.next(message);
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.websocket.onclose = () => {
      console.log('WebSocket connection closed, reconnecting...');
      //setTimeout(() => this.connect(), 1000); // Reconnect after 1 second
    };
  }

  sendMessage(message: any) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Message not sent:', message);
    }
  }

  getMessages(): Observable<any> {
    return this.messages.asObservable();
  }
}
