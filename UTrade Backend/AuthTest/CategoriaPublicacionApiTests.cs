using API;
using API.Utilidad;
using DTO;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http.Json;

namespace AuthTest
{
    [TestClass]
    public class CategoriaPublicacionApiTests
    {
        private readonly HttpClient _client;

        public CategoriaPublicacionApiTests()
        {
            var factory = new WebApplicationFactory<API.Program>();
            _client = factory.CreateClient();
        }

        [TestMethod]
        public async Task BuscarCategoria_DeberiaRetornarCategoria()
        {
            var rsp = await _client.GetFromJsonAsync<Respuesta<CategoriaPublicacionDTO>>(
                "/api/CategoriaPublicacion/Buscar/CAT01"
            );

            Assert.IsNotNull(rsp);
            Assert.IsTrue(rsp.estado);
            Assert.AreEqual("CAT01", rsp.Valor.Id);
        }
    }
}
