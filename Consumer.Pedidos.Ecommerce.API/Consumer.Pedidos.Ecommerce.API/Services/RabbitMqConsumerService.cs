
using Consumer.Pedidos.Ecommerce.API.Models;
using Consumer.Pedidos.Ecommerce.API.Repositories.Interfaces;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace Consumer.Pedidos.Ecommerce.API.Services
{
    public class RabbitMqConsumerService : BackgroundService
    {
        private readonly IPedidosRepository _pedidosRepository;
        private readonly ILogger<RabbitMqConsumerService> _logger;
        private IModel? _channel;

        public RabbitMqConsumerService(IPedidosRepository pedidosRepository, ILogger<RabbitMqConsumerService> logger)
        {
            _pedidosRepository = pedidosRepository;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var factory = new ConnectionFactory()
            {
                HostName = "rabbitmq"
            };

            var retryCount = 10;

            while (retryCount > 0)
            {
                try
                {
                    var connection = factory.CreateConnection();
                    _channel = connection.CreateModel();

                    _channel.QueueDeclare("ecommerce-pedidos-criacao", false, false, false, null);
                    _channel.QueueDeclare("ecommerce-pedidos-finalizacao", false, false, false, null);

                    var consumerCriacao = new EventingBasicConsumer(_channel);
                    consumerCriacao.Received += async (model, ea) =>
                    {
                        var body = ea.Body.ToArray();
                        var json = Encoding.UTF8.GetString(body);
                        var pedido = JsonSerializer.Deserialize<Pedido>(json);

                        if (pedido != null)
                        {
                            await _pedidosRepository.CriarPedidoAsync(pedido);
                            _logger.LogInformation("Pedido criado: {Id}", pedido.Id);
                        }
                    };

                    var consumerFinalizacao = new EventingBasicConsumer(_channel);
                    consumerFinalizacao.Received += async (model, ea) =>
                    {
                        var body = ea.Body.ToArray();
                        var json = Encoding.UTF8.GetString(body);
                        var pedido = JsonSerializer.Deserialize<Pedido>(json);

                        if (pedido is not null)
                        {
                            await _pedidosRepository.FinalizarPedidoAsync(pedido);
                            _logger.LogInformation("Pedido finalizado: {Id}", pedido.Id);
                        }
                    };

                    _channel.BasicConsume("ecommerce-pedidos-criacao", true, consumerCriacao);
                    _channel.BasicConsume("ecommerce-pedidos-finalizacao", true, consumerFinalizacao);

                    return;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Tentativa de conexão falhou: {Message}. Tentando novamente em 5s...", ex.Message);
                    await Task.Delay(5000, stoppingToken);
                    retryCount--;
                }
            }

            _logger.LogError("Não foi possível conectar ao RabbitMQ após múltiplas tentativas.");
        }
    }
}
