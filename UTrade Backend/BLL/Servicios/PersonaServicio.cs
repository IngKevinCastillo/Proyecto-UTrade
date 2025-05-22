using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios
{
    public class PersonaServicio : IPersonaServicio
    {
        private readonly IRepositorioGenerico<Persona> _personaRepositorio;
        private readonly IMapper _mapper;
        public PersonaServicio(IRepositorioGenerico<Persona> usuarioRepositorio, IMapper mapper)
        {
            _personaRepositorio = usuarioRepositorio;
            _mapper = mapper;
        }

        public async Task<PersonaDTO> Crear(PersonaDTO modelo)
        {
            try
            {
                var usuarioCreado = await _personaRepositorio.Crear(_mapper.Map<Persona>(modelo));
                if (usuarioCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<PersonaDTO>(usuarioCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(PersonaDTO modelo)
        {
            try
            {
                var personaModelo = _mapper.Map<Persona>(modelo);
                var personaEncontrado = await _personaRepositorio.Obtener(x => x.Id == personaModelo.Id);
                if (personaEncontrado == null)
                    throw new TaskCanceledException("Usuario no existe");
                personaEncontrado.Nombres = personaModelo.Nombres;
                personaEncontrado.Apellidos = personaModelo.Apellidos;
                personaEncontrado.FechaNacimiento = personaModelo.FechaNacimiento;
                personaEncontrado.Genero = personaModelo.Genero;
                personaEncontrado.NombreUsuario = personaModelo.NombreUsuario;
                personaEncontrado.Contraseña = personaModelo.Contraseña;
                personaEncontrado.Correo = personaModelo.Correo;
                personaEncontrado.Telefono = personaModelo.Telefono;
                if (!string.IsNullOrEmpty(modelo.FotoPerfilBase64))
                {
                    modelo.FotoPerfil = Convert.FromBase64String(modelo.FotoPerfilBase64);
                    personaEncontrado.FotoPerfil = modelo.FotoPerfil;
                }
                bool respuesta = await _personaRepositorio.Editar(personaEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
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
                var personaEncontrada = await _personaRepositorio.Obtener(x => x.Id == id);
                if (personaEncontrada == null)
                    throw new TaskCanceledException("Usuario no existe");
                bool respuesta = await _personaRepositorio.Eliminar(personaEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<PersonaDTO>> Listar()
        {
            try
            {
                var queryUsuario = await _personaRepositorio.Consultar();
                var listaUsuario = queryUsuario.ToList();

                return _mapper.Map<List<PersonaDTO>>(listaUsuario);
            }
            catch
            {
                throw;
            }
        }


        public async Task<SesionDTO> ValidarCredenciales(string correo, string? telefono, string contraseña)
        {
            try
            {
                var queryPersona = await _personaRepositorio.Consultar(x =>
                    (x.Correo == correo && x.Contraseña == contraseña) ||
                    (x.Telefono == telefono && x.Contraseña == contraseña)
                );

                var personaEncontrada = queryPersona.FirstOrDefault();

                if (personaEncontrada == null)
                    throw new TaskCanceledException("Persona no encontrada");

                return _mapper.Map<SesionDTO>(personaEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<PersonaDTO> Obtener(string id)
        {
            try
            {
                var personaEncontrada = await _personaRepositorio.Obtener(x => x.Id == id);
                if (personaEncontrada == null)
                    throw new TaskCanceledException("Usuario no existe");
                return _mapper.Map<PersonaDTO>(personaEncontrada);
            }
            catch
            {
                throw;
            }
        }

    }
}