FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["Consumer.Pedidos.Ecommerce.API/Consumer.Pedidos.Ecommerce.API.csproj", "Consumer.Pedidos.Ecommerce.API/"]
RUN dotnet restore "Consumer.Pedidos.Ecommerce.API/Consumer.Pedidos.Ecommerce.API.csproj"

COPY Consumer.Pedidos.Ecommerce.API/ Consumer.Pedidos.Ecommerce.API/
WORKDIR /src/Consumer.Pedidos.Ecommerce.API
RUN dotnet build "Consumer.Pedidos.Ecommerce.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Consumer.Pedidos.Ecommerce.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_HTTP_PORTS=7005
EXPOSE 7005
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "Consumer.Pedidos.Ecommerce.API.dll" ]
