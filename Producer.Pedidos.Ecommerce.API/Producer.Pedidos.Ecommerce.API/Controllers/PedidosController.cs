using Microsoft.AspNetCore.Mvc;
using Producer.Pedidos.Ecommerce.API.Models;
using Producer.Pedidos.Ecommerce.API.Services.Interfaces;

namespace Producer.Pedidos.Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly IRabbitMqService _rabbit;
        private readonly ILogger<PedidosController> _logger;

        public PedidosController(IRabbitMqService rabbit, ILogger<PedidosController> logger)
        {
            _rabbit = rabbit;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult CriarPedido(CriarPedidoDto pedido)
        {
            try
            {
                var pedidoCompleto = new
                {
                    Id = Guid.NewGuid(),
                    ClienteId = pedido.ClienteId,
                    ProdutoId = pedido.ProdutoId,
                    Status = "Pendente",
                    DataCriacao = DateTime.UtcNow,
                    DataAtualizacao = DateTime.UtcNow
                };

                _rabbit.PublicarPedidoCriacao(pedidoCompleto);
                return Ok(pedidoCompleto);
            }
            catch (Exception ex)
            {
                _logger.LogError("[Cadastrar] Erro ao publicar pedido na fila: " + ex.Message);
                return BadRequest("[Cadastrar] Erro ao publicar pedido na fila: " + ex.Message);
            }
        }

        [HttpPut("finalizar/{id}")]
        public IActionResult FinalizarPedido(Guid id)
        {
            try
            {
                var pedidoFinalizado = new
                {
                    Id = id,
                    Status = "Finalizado",
                    DataAtualizacao = DateTime.UtcNow
                };

                _rabbit.PublicarPedidoFinalizacao(pedidoFinalizado);
                return Ok($"[Atualizar] Publicação de finalização do pedido {id} realizada com sucesso");
            }
            catch (Exception ex)
            {
                _logger.LogError("[Atualizar] Erro ao publicar pedido na fila: " + ex.Message);
                return BadRequest("[Atualizar] Erro ao publicar pedido na fila: " + ex.Message);
            }
        }
    }
}
