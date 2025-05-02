import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-real-time',
  imports: [CommonModule, FormsModule],
  templateUrl: './real-time.component.html',
  styleUrl: './real-time.component.scss'
})
export class RealTimeComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = { text: this.newMessage, timestamp: new Date() };
      this.websocketService.sendMessage(message);
      this.newMessage = '';
    }
  }
}