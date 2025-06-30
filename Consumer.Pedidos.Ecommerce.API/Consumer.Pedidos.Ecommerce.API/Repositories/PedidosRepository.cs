using Consumer.Pedidos.Ecommerce.API.Models;
using Consumer.Pedidos.Ecommerce.API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace Consumer.Pedidos.Ecommerce.API.Repositories
{
    public class PedidosRepository : IPedidosRepository
    {
        private readonly IDbConnection _connection;

        public PedidosRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task CriarPedidoAsync(Pedido pedido)
        {
            var sql = @"INSERT INTO Pedidos (id, clienteid, produtoid, status, datacriacao, dataatualizacao)
                                VALUES (@Id, @ClienteId, @ProdutoId, @Status, @DataCriacao, @DataAtualizacao);";

            await _connection.ExecuteAsync(sql, pedido);
        }

        public async Task FinalizarPedidoAsync(Pedido pedido)
        {
            var sql = @"UPDATE Pedidos SET status = @Status, dataatualizacao = @DataAtualizacao WHERE id = @Id;";
            await _connection.ExecuteAsync(sql, pedido);
        }
    }
}
