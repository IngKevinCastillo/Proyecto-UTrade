using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios
{
    public class ContactanosServicio : IContactanosServicio
    {
        private readonly IRepositorioGenerico<Contactanos> _contactanosRepositorio;
        private readonly IMapper _mapper;
        private string _correoEmisor = "utradeemisor@gmail.com";
        private string _correoEmisorContrasenia = "azwt upgp plef sops";
        private string servidorSMTP = "smtp.gmail.com";
        private int puertoSMTP = 587;

        public ContactanosServicio(IRepositorioGenerico<Contactanos> contactanosRepositorio, IMapper mapper)
        {
            _contactanosRepositorio = contactanosRepositorio;
            _mapper = mapper;
        }

        public async Task<ContactanosDTO> Buscar(string id)
        {
            try
            {
                var queryContactanos = _contactanosRepositorio.Obtener(x => x.Id == id);
                return _mapper.Map<ContactanosDTO>(queryContactanos);
            }
            catch
            {
                throw;
            }
        }

        public async Task<ContactanosDTO> Crear(ContactanosDTO modelo)
        {
            try
            {
                var contactanosCreado = await _contactanosRepositorio.Crear(_mapper.Map<Contactanos>(modelo));
                if (contactanosCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<ContactanosDTO>(contactanosCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(ContactanosDTO modelo)
        {
            try
            {
                var contactanosModelo = _mapper.Map<Contactanos>(modelo);
                var contactanosEncontrado = await _contactanosRepositorio.Obtener(x => x.Id == modelo.Id);
                if (contactanosEncontrado == null)
                    throw new TaskCanceledException("El contacto no existe");
                contactanosEncontrado.Descripcion = contactanosModelo.Descripcion;
                return await _contactanosRepositorio.Editar(contactanosModelo);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(string id)
        {
            try
            {
                var contactanosEncontrado = await _contactanosRepositorio.Obtener(x => x.Id == id);
                if (contactanosEncontrado == null)
                    throw new TaskCanceledException("El contacto no existe");
                return await _contactanosRepositorio.Eliminar(contactanosEncontrado);
            }
            catch
            {
                throw;
            }
        }

        public Task<bool> EnviarCorreo(string correoDestino, string asunto, string mensaje, RazonesDTO razon, string correoRespuesta)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(_correoEmisor);
                mail.To.Add(correoDestino);
                mail.Subject = asunto;

                mail.Body = $@"
            <html>
            <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;'>
                <div style='max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;'>
                    <h2 style='color: #0078D7;'>📧 ¡Nuevo Mensaje Recibido!</h2>
                    <p style='font-size: 16px;'>Hola,</p>
                    <p style='font-size: 16px; white-space: pre-wrap;'>{mensaje}</p>
                    <hr style='border: none; border-top: 1px solid #eee;'/>
                    <p style='font-size: 14px; color: #555;'>
                        <strong>➡️ Responder a:</strong> <a href='mailto:{correoRespuesta}' style='color: #0078D7;'>{correoRespuesta}</a><br/>
                        <strong>🔍 Razón:</strong> {razon.Nombre}
                    </p>
                </div>
            </body>
            </html>";

                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.Normal;

                SmtpClient clienteSMTP = new SmtpClient(servidorSMTP, puertoSMTP)
                {
                    Credentials = new NetworkCredential(_correoEmisor, _correoEmisorContrasenia),
                    EnableSsl = true
                };
                clienteSMTP.Send(mail);
                return Task.FromResult(true);
            }
            catch
            {
                throw;
            }
        }


        public Task<List<ContactanosDTO>> Listar()
        {
            try
            {
                var queryContactanos = _contactanosRepositorio.Consultar();
                return Task.FromResult(_mapper.Map<List<ContactanosDTO>>(queryContactanos));
            }
            catch
            {
                throw;
            }
        }
    }
}
