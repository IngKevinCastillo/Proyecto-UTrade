using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios
{
    public class UsuarioServicio : IUsuarioServicio
    {
        private readonly IRepositorioGenerico<Persona> _personaRepositorio;
        private readonly IMapper _mapper;
        public UsuarioServicio(IRepositorioGenerico<Persona> usuarioRepositorio, IMapper mapper)
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
                var listaUsuario = queryUsuario.Include(persona => persona.Id).ToList();
                return _mapper.Map<List<PersonaDTO>>(listaUsuario);
            }
            catch
            {
                throw;
            }
        }

        public async Task<SesionDTO> ValidarCredenciales(string correo, string? telefono, string clave)
        {
            try
            {
                var queryPersona = await _personaRepositorio.Consultar(x =>
                    x.Correo == correo &&
                    x.Contraseña == clave
                    || x.Telefono == telefono &&
                    x.Contraseña == clave
                );
                if (queryPersona.FirstOrDefault() == null)
                    throw new TaskCanceledException("Usuario no encontrado");
                Persona devolverPersona = queryPersona.Include(persona => persona.Id).First();
                return _mapper.Map<SesionDTO>(devolverPersona);
            }
            catch
            {
                throw;
            }
        }
    }
}