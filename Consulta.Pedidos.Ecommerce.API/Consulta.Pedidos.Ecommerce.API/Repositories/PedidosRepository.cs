using Consulta.Pedidos.Ecommerce.API.Models;
using Consulta.Pedidos.Ecommerce.API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace Consulta.Pedidos.Ecommerce.API.Repositories
{
    public class PedidosRepository : IPedidosRepository
    {
        private readonly IDbConnection _connection;

        public PedidosRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public IEnumerable<PedidoDto> ObterTodosPedidos()
        {
            var sql = "SELECT p.id, prod.nome AS nomeProduto, cli.nome AS nomeCliente, p.status, p.datacriacao, p.dataatualizacao FROM Pedidos p INNER JOIN Produtos prod ON p.produtoid = prod.id INNER JOIN Clientes cli ON p.clienteid = cli.id";
            return _connection.Query<PedidoDto>(sql);
        }

        public int ObterQuantidadeTotal()
        {
            var sql = "SELECT COUNT(*) FROM Pedidos WHERE status = 'Finalizado';";
            return _connection.ExecuteScalar<int>(sql);
        }

        public decimal ObterMediaPedidosPorCliente()
        {
            var sql = @"
                SELECT 
                    COALESCE(CAST(COUNT(*) AS decimal) / NULLIF(COUNT(DISTINCT clienteid), 0), 0)
                FROM Pedidos
                WHERE status = 'Finalizado';";

            return _connection.ExecuteScalar<decimal>(sql);
        }

        public decimal ObterValorTotal()
        {
            var sql = @"
                SELECT COALESCE(SUM(prod.preco), 0)
                FROM Pedidos p
                INNER JOIN Produtos prod ON p.produtoid = prod.id
                WHERE p.status = 'Finalizado';";
            return _connection.ExecuteScalar<decimal>(sql);
        }

        public decimal ObterValorMedioPedidosPorCliente()
        {
            var sql = @"
                SELECT COALESCE(AVG(cliente_total), 0)
                FROM (
                    SELECT SUM(prod.preco) AS cliente_total
                    FROM Pedidos p
                    INNER JOIN Produtos prod ON p.produtoid = prod.id
                    WHERE p.status = 'Finalizado'
                    GROUP BY p.clienteid
                ) AS sub;";
            return _connection.ExecuteScalar<decimal>(sql);
        }

        public IEnumerable<QuantidadePedidosDto> ObterQuantidadePorProduto()
        {
            var sql = @"
                SELECT prod.nome AS produto, COUNT(*) AS quantidade
                FROM Pedidos p
                INNER JOIN Produtos prod ON p.produtoid = prod.id
                WHERE p.status = 'Finalizado'
                GROUP BY prod.nome
                ORDER BY COUNT(*);";

            return _connection.Query<QuantidadePedidosDto>(sql);
        }

        public IEnumerable<ClienteDto> ObterTodosClientes()
        {
            var sql = "SELECT * FROM Clientes;";

            return _connection.Query<ClienteDto>(sql);
        }

        public IEnumerable<ProdutoDto> ObterTodosProdutos()
        {
            var sql = "SELECT * FROM Produtos;";

            return _connection.Query<ProdutoDto>(sql);
        }
    }
}
