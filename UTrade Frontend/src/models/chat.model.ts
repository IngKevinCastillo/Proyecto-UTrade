export interface ChatMessage {
  contenido: string;
  fechaEnvio: Date | string;
  remitenteId: string;
  destinatarioId: string;
  isOwn?: boolean;
}

export interface Conversation {
  id: string;
  username: string;
  lastMessage: string;
  time: string;
  avatarUrl: string;
  unread?: boolean;
}
