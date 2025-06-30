using Consulta.Pedidos.Ecommerce.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Consulta.Pedidos.Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly IPedidosRepository _pedidoRepository;
        private readonly ILogger<PedidosController> _logger;

        public PedidosController(IPedidosRepository pedidoRepository, ILogger<PedidosController> logger)
        {
            _pedidoRepository = pedidoRepository;
            _logger = logger;
        }

        [HttpGet("obterTodosPedidos")]
        public IActionResult ObterTodosPedidos()
        {
            try
            {
                return Ok(_pedidoRepository.ObterTodosPedidos());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao buscar todos os pedidos: " + ex.Message);
                return BadRequest("Erro ao buscar todos os pedidos: " + ex.Message);
            }
        }

        [HttpGet("obterQuantidadeTotal")]
        public IActionResult ObterQuantidadeTotal()
        {
            try
            {
                return Ok(_pedidoRepository.ObterQuantidadeTotal());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao buscar a quantidade total de pedidos: " + ex.Message);
                return BadRequest("Erro ao buscar a quantidade total de pedidos: " + ex.Message);
            }
        }

        [HttpGet("obterMediaPedidosPorCliente")]
        public IActionResult ObterMediaPedidosPorCliente()
        {
            try
            {
                return Ok(_pedidoRepository.ObterMediaPedidosPorCliente());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao buscar a media total de pedidos por clientes: " + ex.Message);
                return BadRequest("Erro ao buscar a media total de pedidos por clientes: " + ex.Message);
            }
        }

        [HttpGet("obterValorTotal")]
        public IActionResult ObterValorTotal()
        {
            try
            {
                return Ok(_pedidoRepository.ObterValorTotal());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao buscar o valor total de pedidos: " + ex.Message);
                return BadRequest("Erro ao buscar o valor total de pedidos: " + ex.Message);
            }
        }

        [HttpGet("obterValorMedioPedidosPorCliente")]
        public IActionResult ObterValorMedioPedidosPorCliente()
        {
            try
            {
                return Ok(_pedidoRepository.ObterValorMedioPedidosPorCliente());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao buscar o valor médio de pedidos por clientes: " + ex.Message);
                return BadRequest("Erro ao buscar o valor médio de pedidos por clientes: " + ex.Message);
            }
        }

        [HttpGet("obterQuantidadePorProduto")]
        public IActionResult ObterQuantidadePorProduto()
        {
            try
            {
                return Ok(_pedidoRepository.ObterQuantidadePorProduto());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao buscar quantidade de produtos: " + ex.Message);
                return BadRequest("Erro ao buscar quantidade de produtos: " + ex.Message);
            }
        }

        [HttpGet("obterTodosClientes")]
        public IActionResult ObterTodosClientes()
        {
            try
            {
                return Ok(_pedidoRepository.ObterTodosClientes());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao obter todos os clientes: " + ex.Message);
                return BadRequest("Erro ao obter todos os clientes: " + ex.Message);
            }
        }

        [HttpGet("obterTodosProdutos")]
        public IActionResult ObterTodosProdutos()
        {
            try
            {
                return Ok(_pedidoRepository.ObterTodosProdutos());
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao obter todos os produtos: " + ex.Message);
                return BadRequest("Erro ao obter todos os produtos: " + ex.Message);
            }
        }
    }
}
