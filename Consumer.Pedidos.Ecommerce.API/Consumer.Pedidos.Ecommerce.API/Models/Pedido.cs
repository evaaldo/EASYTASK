namespace Consumer.Pedidos.Ecommerce.API.Models
{
    public class Pedido
    {
        public Guid Id { get; set; }
        public Guid ClienteId { get; set; }
        public Guid ProdutoId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
}
