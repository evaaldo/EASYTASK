using Consulta.Pedidos.Ecommerce.API.Models;

namespace Consulta.Pedidos.Ecommerce.API.Repositories.Interfaces
{
    public interface IPedidosRepository
    {
        IEnumerable<PedidoDto> ObterTodosPedidos();
        int ObterQuantidadeTotal();
        decimal ObterMediaPedidosPorCliente();
        decimal ObterValorTotal();
        decimal ObterValorMedioPedidosPorCliente();
        IEnumerable<QuantidadePedidosDto> ObterQuantidadePorProduto();
        IEnumerable<ClienteDto> ObterTodosClientes();
        IEnumerable<ProdutoDto> ObterTodosProdutos();
    }
}
