import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Conversation } from '../chat/chat.component';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  @Input() conversations: Conversation[] = [];
  @Input() selectedConversation: Conversation | null = null;
  @Output() conversationSelected = new EventEmitter<Conversation>();

  selectConversation(conversation: Conversation) {
    this.conversationSelected.emit(conversation);
  }
}