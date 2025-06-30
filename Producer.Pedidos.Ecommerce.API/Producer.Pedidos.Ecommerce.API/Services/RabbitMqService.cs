using Producer.Pedidos.Ecommerce.API.Services.Interfaces;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace Producer.Pedidos.Ecommerce.API.Services
{
    public class RabbitMqService : IRabbitMqService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<RabbitMqService> _logger;

        public RabbitMqService(ILogger<RabbitMqService> logger)
        {
            _logger = logger;

            var factory = new ConnectionFactory()
            {
                HostName = "rabbitmq_pedidos_ecommerce"
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.QueueDeclare(queue: "ecommerce-pedidos-criacao",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);

            _channel.QueueDeclare(queue: "ecommerce-pedidos-finalizacao",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
        }

        public void PublicarPedidoCriacao(object pedido)
        {
            try
            {
                var json = JsonSerializer.Serialize(pedido);
                var body = Encoding.UTF8.GetBytes(json);

                _channel.BasicPublish(exchange: "",
                                      routingKey: "ecommerce-pedidos-criacao",
                                      basicProperties: null,
                                      body: body);
            }
            catch (Exception ex)
            {
                _logger.LogError("[RabbitMq] Erro: " + ex.Message);
                throw;
            }
        }

        public void PublicarPedidoFinalizacao(object pedido)
        {
            try
            {
                var json = JsonSerializer.Serialize(pedido);
                var body = Encoding.UTF8.GetBytes(json);

                _channel.BasicPublish(exchange: "",
                          routingKey: "ecommerce-pedidos-finalizacao",
                          basicProperties: null,
                          body: body);
            }
            catch (Exception ex)
            {
                _logger.LogError("[RabbitMq] Erro: " + ex.Message);
                throw;
            }
        }
    }
}
