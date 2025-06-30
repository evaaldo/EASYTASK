using Consumer.Pedidos.Ecommerce.API.Models;

namespace Consumer.Pedidos.Ecommerce.API.Repositories.Interfaces
{
    public interface IPedidosRepository
    {
        Task CriarPedidoAsync(Pedido pedido);
        Task FinalizarPedidoAsync(Pedido pedido);
    }
}
