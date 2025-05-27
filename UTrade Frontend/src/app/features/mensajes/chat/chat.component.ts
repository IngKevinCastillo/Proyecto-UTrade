import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../Services/chat.service';
import { PerfilService } from '../../../Services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { MensajesService } from '../../../Services/mensajes.service';
import { SignalrService } from '../../../Services/signalr.service';
import { Subscription } from 'rxjs';

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
export class ChatComponent implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  idUsuarioSesion: string = '';
  messages: any[] = [];
  private chatIdToOpen: string | null = null;
  private signalRConnected = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private chatService: ChatService,
    private profileService: PerfilService,
    private toastr: ToastrService,
    private mensajesService: MensajesService,
    private signalRService: SignalrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    this.idUsuarioSesion = usuario.idUsuario;

    const routeSubscription = this.route.queryParams.subscribe((params) => {
      if (params['chatId']) {
        this.chatIdToOpen = params['chatId'];
        console.log('Chat ID a abrir:', this.chatIdToOpen);
      }
    });
    this.subscriptions.push(routeSubscription);

    this.initializeSignalR();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());

    if (this.selectedConversation) {
      this.signalRService
        .salirDelChat(this.selectedConversation.id)
        .catch((err) => console.error('Error al salir del chat:', err));
    }
  }

  private async initializeSignalR(): Promise<void> {
    try {
      await this.signalRService.startConnection();
      this.signalRConnected = true;
      console.log('SignalR conectado exitosamente');

      this.setupMessageListener();

      this.cargarConversaciones();
    } catch (error) {
      console.error('Error al conectar SignalR:', error);
      this.toastr.error('Error de conexión en tiempo real', 'Error');
      this.cargarConversaciones();
    }
  }

  private setupMessageListener(): void {
    this.signalRService.addReceiveMessageListener((mensaje) => {
      console.log('Mensaje recibido:', mensaje);

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
        this.toastr.info('Nuevo mensaje recibido en otro chat');
      }

      this.updateConversationList(mensaje);
    });
  }

  private updateConversationList(mensaje: any): void {
    const index = this.conversations.findIndex((c) => c.id === mensaje.chatId);

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
  }

  private cargarConversaciones(): void {
    this.chatService.listarPorUsuario(this.idUsuarioSesion).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          const promesasConversaciones = res.valor.map((chat: any) => {
            return new Promise<void>((resolve) => {
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
                              ? 'data:image/jpeg;base64,' +
                                usuarioOtro.fotoPerfil
                              : 'icons/no-photo.webp',
                          };

                          this.conversations.push(conversacion);
                          resolve();
                        },
                        error: () => {
                          this.toastr.warning(
                            'No se pudo cargar el último mensaje'
                          );
                          resolve();
                        },
                      });
                  } else {
                    resolve();
                  }
                },
                error: () => {
                  this.toastr.warning('Error al obtener datos de un contacto');
                  resolve();
                },
              });
            });
          });

          Promise.all(promesasConversaciones).then(() => {
            setTimeout(() => {
              this.abrirChatEspecifico();
            }, 500);
          });
        } else {
          this.verificarYCrearNuevaConversacion();
        }
      },
      error: () => {
        this.toastr.error('No has iniciado conversaciones aún');
        this.verificarYCrearNuevaConversacion();
      },
    });
  }

  private abrirChatEspecifico(): void {
    if (this.chatIdToOpen) {
      const conversacionAAbrir = this.conversations.find(
        (conv) => conv.id === this.chatIdToOpen
      );

      if (conversacionAAbrir) {
        this.selectConversation(conversacionAAbrir);
        this.toastr.success('Chat abierto automáticamente', 'Éxito');
      } else {
        this.verificarYCrearNuevaConversacion();
      }

      this.chatIdToOpen = null;
    }
  }

  private verificarYCrearNuevaConversacion(): void {
    if (this.chatIdToOpen) {
      this.chatService.buscar(this.chatIdToOpen).subscribe({
        next: (res) => {
          if (res.estado && res.valor) {
            this.crearConversacionDesdeChat(res.valor);
          } else {
            this.toastr.warning('Chat no encontrado', 'Advertencia');
          }
        },
        error: () => {
          this.toastr.error('Error al obtener información del chat', 'Error');
        },
      });
    }
  }

  private crearConversacionDesdeChat(chat: any): void {
    const idOtroUsuario =
      chat.usuario1Id === this.idUsuarioSesion
        ? chat.usuario2Id
        : chat.usuario1Id;

    this.profileService.obtenerPerfil(idOtroUsuario).subscribe({
      next: (perfilRes) => {
        if (perfilRes.estado && perfilRes.valor) {
          const usuarioOtro = perfilRes.valor;

          const nuevaConversacion: Conversation = {
            id: chat.id,
            username: `${usuarioOtro.nombres} ${usuarioOtro.apellidos}`,
            lastMessage: 'Sin mensajes aún',
            time: '',
            avatarUrl: usuarioOtro.fotoPerfil
              ? 'data:image/jpeg;base64,' + usuarioOtro.fotoPerfil
              : 'icons/no-photo.webp',
          };

          this.conversations.unshift(nuevaConversacion);
          setTimeout(() => {
            this.selectConversation(nuevaConversacion);
            this.toastr.success('Nuevo chat abierto automáticamente', 'Éxito');
          }, 500);
        }
      },
      error: () => {
        this.toastr.error('Error al obtener datos del usuario', 'Error');
      },
    });
  }

  async selectConversation(conversation: Conversation) {
    if (this.selectedConversation) {
      try {
        await this.signalRService.salirDelChat(this.selectedConversation.id);
        console.log('Salió del chat anterior:', this.selectedConversation.id);
      } catch (err) {
        console.error('Error al salir del chat:', err);
      }
    }

    this.selectedConversation = conversation;
    this.messages = [];

    if (this.signalRConnected) {
      try {
        await this.signalRService.unirseAlChat(conversation.id);
        console.log('Se unió al chat:', conversation.id);
      } catch (err) {
        console.error('Error al unirse al chat:', err);
        this.toastr.warning('Error al conectar al chat en tiempo real');
      }
    } else {
      console.warn('SignalR no está conectado, reintentando...');
      this.initializeSignalR().then(() => {
        if (this.signalRConnected) {
          this.signalRService.unirseAlChat(conversation.id);
        }
      });
    }

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
