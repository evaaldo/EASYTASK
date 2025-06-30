using Producer.Pedidos.Ecommerce.API.Services;
using Producer.Pedidos.Ecommerce.API.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IRabbitMqService, RabbitMqService>();

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

app.MapGet("", () => "API producer rodando!");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
