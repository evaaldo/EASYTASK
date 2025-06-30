import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Chart from "../components/Chart";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import { TabelaPedidos } from "../components/TabelaPedidos";
import { pedidosService } from "../services/pedidosService";
import type { PedidoLocal } from "./interfaces/PedidoLocal";
import type { PedidoAPI } from "./interfaces/PedidoApi";

export function Dashboard() {
  const [pedidos, setPedidos] = useState<PedidoLocal[]>([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorMedio, setValorMedio] = useState(0);
  const [qtdTotal, setQtdTotal] = useState(0);
  const [mediaCliente, setMediaCliente] = useState(0);

  useEffect(() => {
    async function carregarDados() {
      const [
        vTotal,
        vMedio,
        qtd,
        media,
        pedidosApi
      ] = await Promise.all([
        pedidosService.obterValorTotal(),
        pedidosService.obterValorMedioPedidosPorCliente(),
        pedidosService.obterQuantidadeTotal(),
        pedidosService.obterMediaPedidosPorCliente(),
        pedidosService.obterTodosPedidos(),
      ]);

      setValorTotal(vTotal);
      setValorMedio(vMedio);
      setQtdTotal(qtd);
      setMediaCliente(media);

      const pedidosComIdLocal = pedidosApi.filter((pedido: PedidoAPI) => pedido.status === "Finalizado").map((pedido: PedidoAPI, i: number) => ({
        id: i + 1,
        uuid: pedido.id,
        cliente: pedido.nomeCliente,
        produto: pedido.nomeProduto,
        status: pedido.status,
        dataCriacao: pedido.dataCriacao,
        dataAtualizacao: pedido.dataAtualizacao,
      }));

      setPedidos(pedidosComIdLocal);
    }

    carregarDados();
  }, []);

  function useIs2xl() {
    const [is2xl, setIs2xl] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 1536px)");
      setIs2xl(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIs2xl(e.matches);
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return is2xl;
  }

  const is2xl = useIs2xl();

  return (
    <div className="h-[100vh]">
      <Header />
      <Sidebar />
      <main>
        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-6 py-10 px-40 2xl:px-40">
          <Card type="currency" label="Valor Total" value={valorTotal.toFixed(2)} />
          <Card type="currency" label="Média Cliente" value={valorMedio.toFixed(2)} />
          <Card type="amount" label="Total Pedidos" value={qtdTotal.toString()} />
          <Card type="amount" label="Média Pedidos" value={mediaCliente.toFixed(0)} />
        </div>
        {is2xl ? (
          <div className="flex justify-between px-40 py-10 gap-10 max-h-[380px]">
            <div>
              <h1 className="text-white p-2 font-bold bg-[#5C5CDA] px-5 rounded-t-lg text-xl">
                Relação de pedidos por produtos
              </h1>
              <div className="bg-white px-20 py-10 rounded-b-lg shadow-xl">
                <Chart width={700} />
              </div>
            </div>
            <div>
              <TabelaPedidos pedidos={pedidos} exibirAcao={false} alturaMaxima="max-h-[380px]" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 py-10 mx-auto max-w-5xl">
            <div>
              <h1 className="text-white p-2 font-bold bg-[#5C5CDA] px-5 rounded-t-lg text-xl">
                Relação de pedidos por produtos
              </h1>
              <div className="bg-white px-10 py-10 rounded-b-lg shadow-xl">
                <Chart width={950} />
              </div>
            </div>
            <div>
              <TabelaPedidos pedidos={pedidos} exibirAcao={false} alturaMaxima="max-h-[380px]" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
