namespace Consulta.Pedidos.Ecommerce.API.Models
{
    public class PedidoDto
    {
        public Guid Id { get; set; }
        public string NomeProduto { get; set; }
        public string NomeCliente { get; set; }
        public string Status { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
}
