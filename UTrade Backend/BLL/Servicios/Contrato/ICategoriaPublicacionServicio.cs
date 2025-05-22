using AutoMapper;
using DAL.Repositorios.Contrato;
using DTO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface ICategoriaPublicacionServicio
    {
        Task<List<CategoriaPublicacionDTO>> Listar();
        Task<CategoriaPublicacionDTO> Crear(CategoriaPublicacionDTO modelo);
        Task<bool> Editar(CategoriaPublicacionDTO modelo);
        Task<CategoriaPublicacionDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
