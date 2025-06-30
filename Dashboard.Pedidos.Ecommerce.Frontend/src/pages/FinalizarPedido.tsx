import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import { TabelaPedidos } from "../components/TabelaPedidos";
import type { PedidoLocal } from "./interfaces/PedidoLocal";
import type { PedidoAPI } from "./interfaces/PedidoApi";
import { pedidosService } from "../services/pedidosService";

export function FinalizarPedido() {
  const [pedidos, setPedidos] = useState<PedidoLocal[]>([]);

  useEffect(() => {
      async function carregarDados() {
        const [
          pedidosApi
        ] = await Promise.all([
          pedidosService.obterTodosPedidos(),
        ]);
  
        const pedidos = pedidosApi.map((pedido: PedidoAPI, i: number) => ({
          id: i + 1,
          uuid: pedido.id,
          cliente: pedido.nomeCliente,
          produto: pedido.nomeProduto,
          status: pedido.status,
          dataCriacao: pedido.dataCriacao,
          dataAtualizacao: pedido.dataAtualizacao,
        }));
  
        setPedidos(pedidos);
      }
  
      carregarDados();
    }, []);

  return (
    <div className="bg-[#E3E9F7] min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10">
          <TabelaPedidos pedidos={pedidos} exibirAcao alturaMaxima="max-h-[70vh]" />
        </main>
      </div>
    </div>
  )
}
