FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["Producer.Pedidos.Ecommerce.API/Producer.Pedidos.Ecommerce.API.csproj", "Producer.Pedidos.Ecommerce.API/"]
RUN dotnet restore "Producer.Pedidos.Ecommerce.API/Producer.Pedidos.Ecommerce.API.csproj"

COPY Producer.Pedidos.Ecommerce.API/. ./Producer.Pedidos.Ecommerce.API/
WORKDIR /src/Producer.Pedidos.Ecommerce.API
RUN dotnet build "Producer.Pedidos.Ecommerce.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Producer.Pedidos.Ecommerce.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_HTTP_PORTS=7152
EXPOSE 7152
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "Producer.Pedidos.Ecommerce.API.dll" ]
