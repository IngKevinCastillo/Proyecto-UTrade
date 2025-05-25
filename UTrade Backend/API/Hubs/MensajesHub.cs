using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class MensajesHub : Hub
    {
        public async Task UnirseAlChat(string chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        }

        public async Task SalirDelChat(string chatId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
        }

        public async Task EnviarMensajeAChat(string chatId, object mensaje)
        {
            await Clients.Group(chatId).SendAsync("RecibirMensaje", mensaje);
        }
    }
}
