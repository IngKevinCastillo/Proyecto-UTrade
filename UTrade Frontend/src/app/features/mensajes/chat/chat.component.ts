import { Component } from '@angular/core';

export interface Conversation {
  id: number;
  username: string;
  lastMessage: string;
  time: string;
  avatarUrl: string;
  unread?: boolean;
}

export interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  senderAvatar: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  conversations: Conversation[] = [
    {
      id: 1,
      username: 'Khalid Hasan Zibon',
      lastMessage: 'Sup man! How is it going?',
      time: '5:30pm',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      username: 'PewDiePie',
      lastMessage: 'Subscribe to my channel',
      time: '4:30pm',
      avatarUrl: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      username: 'Marzia Mithila',
      lastMessage: 'I love you too ♥',
      time: '3:00pm',
      avatarUrl: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      username: 'Rasel Ahmed',
      lastMessage: 'Link: https://www.youtube.com/...',
      time: '11:00am',
      avatarUrl: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      username: 'Maidul Islam Saad',
      lastMessage: 'Vai kotothik tore dekhina...',
      time: '10:25pm',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 6,
      username: 'Earid Ahmed',
      lastMessage: 'Hager Hager Dutar kamaisos!...',
      time: '10:25pm',
      avatarUrl: 'https://i.pravatar.cc/150?img=6'
    }
  ];

  messages: ChatMessage[] = [
    {
      id: 1,
      sender: 'Marzia Mithila',
      content: 'Hi, What\'s going on?',
      timestamp: '10:30 AM',
      isOwn: false,
      senderAvatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Hey, what about you?',
      timestamp: '10:32 AM',
      isOwn: true,
      senderAvatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 3,
      sender: 'Marzia Mithila',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales.',
      timestamp: '10:35 AM',
      isOwn: false,
      senderAvatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      sender: 'Me',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      timestamp: '10:40 AM',
      isOwn: true,
      senderAvatar: 'https://i.pravatar.cc/150?img=8'
    }
  ];

  selectedConversation: Conversation = this.conversations[2]; // Marzia Mithila by default

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
  }

  sendMessage(message: string) {
    if (message.trim()) {
      this.messages.push({
        id: this.messages.length + 1,
        sender: 'Me',
        content: message,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isOwn: true,
        senderAvatar: 'https://i.pravatar.cc/150?img=8'
      });
    }
  }
}