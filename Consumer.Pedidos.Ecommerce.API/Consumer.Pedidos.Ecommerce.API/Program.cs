using Consumer.Pedidos.Ecommerce.API.Repositories;
using Consumer.Pedidos.Ecommerce.API.Repositories.Interfaces;
using Consumer.Pedidos.Ecommerce.API.Services;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHostedService<RabbitMqConsumerService>();

builder.Services.AddScoped<IDbConnection>(sp => new Npgsql.NpgsqlConnection(builder.Configuration.GetConnectionString("PedidosEcommerce")));

builder.Services.AddScoped<IPedidosRepository, PedidosRepository>();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
