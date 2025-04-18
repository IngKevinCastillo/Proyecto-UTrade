import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Conversation, ChatMessage } from '../chat/chat.component';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent {
  @Input() selectedConversation: Conversation | null = null;
  @Input() messages: ChatMessage[] = [];
  @Output() messageSent = new EventEmitter<string>();
  
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messageSent.emit(this.newMessage);
      this.newMessage = '';
    }
  }
}