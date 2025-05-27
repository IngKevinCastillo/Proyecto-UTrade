import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from './chat.service';
import { ChatRequest } from '../interfaces/mapa';

@Injectable({
  providedIn: 'root',
})
export class ChatManagerService {
  constructor(
    private chatService: ChatService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  iniciarChat(productoId: string, idUsuarioProducto: string): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    const idUsuarioSesion: string | undefined = usuario.idUsuario;

    if (!idUsuarioSesion || !idUsuarioProducto) {
      this.toastr.error(
        'No se pudo obtener la información de los usuarios',
        'Error'
      );
      return;
    }

    if (idUsuarioSesion === idUsuarioProducto) {
      this.toastr.warning(
        'No puedes iniciar un chat contigo mismo',
        'Advertencia'
      );
      return;
    }

    this.verificarOCrearChat(idUsuarioSesion, idUsuarioProducto);
  }

  private verificarOCrearChat(idUsuario1: string, idUsuario2: string): void {
    this.chatService.verificarExistenciaChat(idUsuario1, idUsuario2).subscribe({
      next: (res) => {
        if (res.estado) {
          if (res.valor && res.valor.trim() !== '') {
            this.navegarAlChat(res.valor);
          } else {
            this.crearNuevoChat(idUsuario1, idUsuario2);
          }
        } else {
          this.toastr.error(
            'Error al verificar la existencia del chat',
            'Error'
          );
        }
      },
      error: () => {
        this.toastr.error('Error al verificar el chat', 'Error');
      },
    });
  }

  private crearNuevoChat(idUsuario1: string, idUsuario2: string): void {
    const nuevoChat: ChatRequest = {
      usuario1Id: idUsuario1,
      usuario2Id: idUsuario2,
    };

    this.chatService.guardar(nuevoChat).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.toastr.success('Chat creado exitosamente', 'Éxito');
          const chatId = res.valor.id || res.valor;
          this.navegarAlChat(chatId);
        } else {
          this.toastr.error('Error al crear el chat', 'Error');
        }
      },
      error: () => {
        this.toastr.error('Error al crear el chat', 'Error');
      },
    });
  }

  private navegarAlChat(chatId: string): void {
    this.router.navigate(['/chat'], { queryParams: { chatId: chatId } });
  }

  configurarFuncionGlobalChat(): void {
    (window as any).iniciarChat = (
      productoId: string,
      idUsuarioProducto: string
    ) => {
      this.iniciarChat(productoId, idUsuarioProducto);
    };
  }
}
