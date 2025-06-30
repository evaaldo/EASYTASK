FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["Consulta.Pedidos.Ecommerce.API/Consulta.Pedidos.Ecommerce.API.csproj", "Consulta.Pedidos.Ecommerce.API/"]
RUN dotnet restore "Consulta.Pedidos.Ecommerce.API/Consulta.Pedidos.Ecommerce.API.csproj"

COPY Consulta.Pedidos.Ecommerce.API/ Consulta.Pedidos.Ecommerce.API/
WORKDIR /src/Consulta.Pedidos.Ecommerce.API
RUN dotnet build "Consulta.Pedidos.Ecommerce.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Consulta.Pedidos.Ecommerce.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_HTTP_PORTS=7049
EXPOSE 7049
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "Consulta.Pedidos.Ecommerce.API.dll" ]
