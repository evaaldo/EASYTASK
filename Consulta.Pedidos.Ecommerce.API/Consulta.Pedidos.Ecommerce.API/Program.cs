using Consulta.Pedidos.Ecommerce.API.Repositories;
using Consulta.Pedidos.Ecommerce.API.Repositories.Interfaces;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IDbConnection>(sp => new Npgsql.NpgsqlConnection(builder.Configuration.GetConnectionString("PedidosEcommerce")));

builder.Services.AddScoped<IPedidosRepository, PedidosRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGet("", () => "API de consulta rodando!");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
