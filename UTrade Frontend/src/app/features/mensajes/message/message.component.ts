import { Component, Input } from '@angular/core';
import { ChatMessage } from '../chat/chat.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message!: ChatMessage;
}