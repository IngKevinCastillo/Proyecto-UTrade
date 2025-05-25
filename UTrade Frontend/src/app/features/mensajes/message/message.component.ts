import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../../../models/chat.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: ChatMessage;
}
