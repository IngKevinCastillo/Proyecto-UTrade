import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
} from '@angular/core';
import { Conversation } from '../chat/chat.component';
import { ChatMessage } from '../../../../models/chat.model';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss'],
})
export class MessageAreaComponent implements OnChanges, AfterViewChecked {
  @Input() selectedConversation: Conversation | null = null;
  @Input() messages: ChatMessage[] = [];
  @Output() messageSent = new EventEmitter<string>();

  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  newMessage = '';
  private shouldScrollToBottom = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedConversation'] || changes['messages']) {
      this.shouldScrollToBottom = true;
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messageSent.emit(this.newMessage);
      this.newMessage = '';
      this.shouldScrollToBottom = true;
    }
  }
}
