namespace Producer.Pedidos.Ecommerce.API.Services.Interfaces
{
    public interface IRabbitMqService
    {
        void PublicarPedidoCriacao(object pedido);
        void PublicarPedidoFinalizacao(object pedido);
    }
}
