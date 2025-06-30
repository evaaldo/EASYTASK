using System.ComponentModel.DataAnnotations;

namespace Producer.Pedidos.Ecommerce.API.Models
{
    public class CriarPedidoDto
    {
        [Required]
        public Guid ClienteId { get; set; }
        [Required]
        public Guid ProdutoId { get; set; }
    }
}
