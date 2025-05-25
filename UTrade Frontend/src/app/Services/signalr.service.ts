import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor() {
    this.startConnection();
  }

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5264/mensajeshub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.log('SignalR Error: ', err));
  }

  unirseAlChat(chatId: string): Promise<void> {
    return this.hubConnection.invoke('UnirseAlChat', chatId);
  }

  salirDelChat(chatId: string): Promise<void> {
    return this.hubConnection.invoke('SalirDelChat', chatId);
  }

  addReceiveMessageListener(callback: (mensaje: any) => void): void {
    this.hubConnection.on('RecibirMensaje', callback);
  }
}
