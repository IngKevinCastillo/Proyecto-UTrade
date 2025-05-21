namespace API.Utilidad
{
    public class Respuesta<T>
    {
        public bool estado { get; set; }
        public T Valor { get; set; }
        public string mgs { get; set; }
    }
}
