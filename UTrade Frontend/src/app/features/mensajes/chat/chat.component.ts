import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { PerfilService } from '../../../Services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { MensajesService } from '../../../Services/mensajes.service';
import { SignalrService } from '../../../Services/signalr.service';

export interface Conversation {
  id: string;
  username: string;
  lastMessage: string;
  time: string;
  avatarUrl: string;
  unread?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  idUsuarioSesion: string = '';
  messages: any[] = [];

  constructor(
    private chatService: ChatService,
    private profileService: PerfilService,
    private toastr: ToastrService,
    private mensajesService: MensajesService,
    private signalRService: SignalrService
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    this.idUsuarioSesion = usuario.idUsuario;
    this.signalRService.startConnection();

    this.signalRService.addReceiveMessageListener((mensaje) => {
      if (
        this.selectedConversation &&
        mensaje.chatId === this.selectedConversation.id
      ) {
        if (mensaje.autorId !== this.idUsuarioSesion) {
          this.messages.push({
            contenido: mensaje.mensaje1,
            fechaEnvio: mensaje.hora,
            remitenteId: mensaje.autorId,
            destinatarioId: this.obtenerDestinatarioId(
              this.selectedConversation
            ),
            isOwn: false,
          });
        }
      } else {
        this.toastr.info(`Nuevo mensaje recibido en otro chat`);
      }

      const index = this.conversations.findIndex(
        (c) => c.id === mensaje.chatId
      );

      if (index !== -1) {
        const conversacionActualizada: Conversation = {
          ...this.conversations[index],
          lastMessage: mensaje.mensaje1,
          time: new Date(mensaje.hora).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        this.conversations = [
          conversacionActualizada,
          ...this.conversations.filter((_, i) => i !== index),
        ];
      }
    });

    this.chatService.listarPorUsuario(this.idUsuarioSesion).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          res.valor.forEach((chat: any) => {
            const idOtroUsuario =
              chat.usuario1Id === this.idUsuarioSesion
                ? chat.usuario2Id
                : chat.usuario1Id;

            this.profileService.obtenerPerfil(idOtroUsuario).subscribe({
              next: (perfilRes) => {
                if (perfilRes.estado && perfilRes.valor) {
                  const usuarioOtro = perfilRes.valor;

                  this.mensajesService
                    .obtenerMensajeMasReciente(chat.id)
                    .subscribe({
                      next: (mensajeRes) => {
                        const ultimoMensaje = mensajeRes.estado
                          ? mensajeRes.valor
                          : null;

                        const conversacion: Conversation = {
                          id: chat.id,
                          username: `${usuarioOtro.nombres} ${usuarioOtro.apellidos}`,
                          lastMessage:
                            ultimoMensaje?.mensaje1 || 'Sin mensajes aún',
                          time: ultimoMensaje
                            ? new Date(ultimoMensaje.hora).toLocaleTimeString(
                                [],
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )
                            : '',
                          avatarUrl: usuarioOtro.fotoPerfil
                            ? 'data:image/jpeg;base64,' + usuarioOtro.fotoPerfil
                            : 'icons/no-photo.webp',
                        };

                        this.conversations.push(conversacion);
                      },
                      error: () => {
                        this.toastr.warning(
                          'No se pudo cargar el último mensaje'
                        );
                      },
                    });
                }
              },
              error: () => {
                this.toastr.warning('Error al obtener datos de un contacto');
              },
            });
          });
        }
      },
      error: () => {
        this.toastr.error('No se pudo cargar los chats');
      },
    });
  }

  selectConversation(conversation: Conversation) {
    if (this.selectedConversation) {
      this.signalRService
        .salirDelChat(this.selectedConversation.id)
        .catch((err) => console.error('Error al salir del chat:', err));
    }

    this.selectedConversation = conversation;
    this.messages = [];

    this.signalRService
      .unirseAlChat(conversation.id)
      .catch((err) => console.error('Error al unirse al chat:', err));

    this.mensajesService.listarPorChat(conversation.id).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.messages = res.valor.map((msg: any) => ({
            contenido: msg.mensaje1,
            fechaEnvio: msg.hora,
            remitenteId: msg.autorId,
            destinatarioId: this.obtenerDestinatarioId(conversation),
            isOwn: msg.autorId === this.idUsuarioSesion,
          }));
        }
      },
      error: () => {
        this.toastr.error('Error al cargar mensajes');
      },
    });
  }

  sendMessage(message: string) {
    if (!message.trim() || !this.selectedConversation) {
      return;
    }

    const nuevoMensaje = {
      chatId: this.selectedConversation.id,
      autorId: this.idUsuarioSesion,
      mensaje: message.trim(),
    };

    this.mensajesService.guardar(nuevoMensaje).subscribe({
      next: (res) => {
        if (res.estado) {
          this.messages.push({
            contenido: message,
            fechaEnvio: new Date().toISOString(),
            remitenteId: this.idUsuarioSesion,
            destinatarioId: this.obtenerDestinatarioId(
              this.selectedConversation!
            ),
            isOwn: true,
          });
        } else {
          this.toastr.warning('No se pudo guardar el mensaje');
        }
      },
      error: () => {
        this.toastr.error('Error al enviar el mensaje');
      },
    });
  }

  obtenerDestinatarioId(conversation: Conversation): string {
    return conversation.id !== this.idUsuarioSesion
      ? conversation.id
      : this.idUsuarioSesion;
  }
}
