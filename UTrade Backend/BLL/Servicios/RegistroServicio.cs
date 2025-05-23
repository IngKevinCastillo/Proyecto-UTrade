using BLL.Servicios.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Servicios
{
    public class RegistroServicio : IRegistroServicio
    {
        private string _correoEmisor = "utradeemisor@gmail.com";
        private string _correoEmisorContrasenia = "azwt upgp plef sops";
        private string servidorSMTP = "smtp.gmail.com";
        private int puertoSMTP = 587;
        public Task<bool> EnviarCorreoVerificacion(EnviarCorreoVerificacionDTO datos)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(_correoEmisor);
                mail.To.Add(datos.CorreoDestino);
                mail.Subject = datos.Asunto;

                mail.Body = $@"
    <html>
    <body style='font-family: ""Segoe UI"", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f9fc; color: #333;'>
        <table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);'>
            <tr>
                <td style='padding: 0;'>
                    <!-- Header -->
                    <table border='0' cellpadding='0' cellspacing='0' width='100%'>
                        <tr>
                            <td style='padding: 30px 30px 20px 30px; text-align: center; background-color: #4f46e5; border-radius: 12px 12px 0 0;'>
                                <h1 style='color: #ffffff; font-size: 28px; margin: 0; font-weight: 600;'>Verificación de Cuenta</h1>
                                <p style='color: #e0e7ff; font-size: 16px; margin: 10px 0 0 0;'>Gracias por unirte a UTrade</p>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- Content -->
                    <table border='0' cellpadding='0' cellspacing='0' width='100%'>
                        <tr>
                            <td style='padding: 30px;'>
                                <p style='font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;'>Hemos recibido una solicitud para crear una cuenta con tu dirección de correo electrónico. Para completar el proceso de registro, por favor utiliza el siguiente código de verificación:</p>
                                
                                <!-- Verification Code Box -->
                                <table border='0' cellpadding='0' cellspacing='0' width='100%' style='margin: 30px 0;'>
                                    <tr>
                                        <td align='center' style='background-color: #f5f3ff; padding: 20px; border-radius: 8px;'>
                                            <div style='background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 8px; padding: 5px;'>
                                                <div style='background-color: #ffffff; border-radius: 6px; padding: 15px 20px;'>
                                                    <h2 style='font-family: monospace; letter-spacing: 5px; font-size: 28px; color: #4f46e5; margin: 0; font-weight: 700;'>{datos.CodigoVerficacion}</h2>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style='font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;'>Si no has solicitado este código, puedes ignorar este mensaje. Es posible que alguien haya ingresado tu dirección de correo por error.</p>
                                
                                <p style='font-size: 16px; line-height: 1.5; margin: 0;'>¡Gracias!</p>
                                <p style='font-size: 16px; line-height: 1.5; margin: 0;'>El equipo de soporte</p>
                            </td>
                        </tr>
                    </table>
                    
                    <table border='0' cellpadding='0' cellspacing='0' width='100%'>
                        <tr>
                            <td style='padding: 20px 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 12px 12px;'>
                                <p style='font-size: 14px; color: #64748b; margin: 0;'>Este es un correo automático, por favor no respondas a este mensaje.</p>
                                <p style='font-size: 14px; color: #64748b; margin: 10px 0 0 0;'>© 2025 UTrade. Todos los derechos reservados.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>";

                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

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

        public Task<string> GenerarCodigoRegistro(DateTime fechaNacimiento)
        {
            int dia = fechaNacimiento.Day;
            int mes = fechaNacimiento.Month;
            int año = fechaNacimiento.Year;

            Random random = new Random();

            string añoStr = año.ToString().Substring(2, 2);
            string mesStr = mes.ToString().PadLeft(2, '0');
            string diaStr = dia.ToString().PadLeft(2, '0');

            int randomNum = random.Next(0, 100);
            string randomStr = randomNum.ToString().PadLeft(2, '0');

            int randomFinal = random.Next(0, 100);
            string randomFinalStr = randomFinal.ToString().PadLeft(2, '0');

            string codigo = $"{añoStr}{mesStr}{diaStr}{randomStr}-{randomFinalStr}";

            if (codigo.IndexOf('-') > 6)
            {
                codigo = codigo.Substring(codigo.IndexOf('-') - 6, 6) + codigo.Substring(codigo.IndexOf('-'));
            }

            return Task.FromResult(codigo);
        }

        public Task<bool> ValidarCodigoRegistro(string codigoRegistro, string codigoRecibido)
        {
            return Task.FromResult(codigoRegistro.Equals(codigoRecibido, StringComparison.OrdinalIgnoreCase));
        }
    }
}
