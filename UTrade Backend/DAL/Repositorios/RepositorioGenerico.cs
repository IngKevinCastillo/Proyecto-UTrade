using DAL.Repositorios.Contrato;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositorios
{
    public class RepositorioGenerico<TModelo> : IRepositorioGenerico<TModelo> where TModelo : class
    {
        private readonly UtradedbContext _dbContext;

        public RepositorioGenerico(UtradedbContext utradedbContext)
        {
            _dbContext = utradedbContext;
        }

        public async Task<IQueryable<TModelo>> Consultar(Expression<Func<TModelo, bool>> filtro = null)
        {
            try
            {
                IQueryable<TModelo> queryModelo = filtro == null ? _dbContext.Set<TModelo>() : _dbContext.Set<TModelo>().Where(filtro);
                return queryModelo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }

        public async Task<TModelo> Crear(TModelo modelo)
        {
            try
            {
                _dbContext.Set<TModelo>().Add(modelo);
                await _dbContext.SaveChangesAsync();
                return modelo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> Editar(TModelo modelo)
        {
            try
            {
                _dbContext.Set<TModelo>().Update(modelo);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> Eliminar(TModelo modelo)
        {
            try
            {
                _dbContext.Set<TModelo>().Remove(modelo);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TModelo> Obtener(Expression<Func<TModelo, bool>> filtro)
        {
            try
            {
                TModelo modelo = await _dbContext.Set<TModelo>().FirstOrDefaultAsync(filtro);
                return modelo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}