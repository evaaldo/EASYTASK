import { pedidosService } from "../services/pedidosService";
import type { TabelaPedidosType } from "./interfaces/TabelaPedidosType";

export function TabelaPedidos({
  pedidos,
  exibirAcao = false,
  alturaMaxima = 'max-h-[400px]',
}: TabelaPedidosType) {

  async function handleFinalizarPedido(idPedido: string) {
    try {
      await pedidosService.finalizarPedido(idPedido);
      alert("Pedido finalizado com sucesso!");
      window.location.reload();
    } catch {
      alert("Erro ao finalizar o pedido.");
    }
  }

  return (
    <div className="max-w-5xl 2xl:max-w-7xl mx-auto rounded">
      <div className="rounded-lg shadow-md border border-gray-200">
        <table className="w-full table-auto bg-white">
          <thead className="bg-[#5C5CDA] text-white sticky top-0">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold uppercase rounded-tl">ÍNDICE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Produto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Criação</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase rounded-tr">
                {exibirAcao ? 'Ação' : 'Atualização'}
              </th>
            </tr>
          </thead>
        </table>

        <div className={`${alturaMaxima} overflow-y-auto rounded`}>
          <table className="w-full table-auto bg-white">
            <tbody className="divide-y divide-gray-100 text-sm">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{pedido.id}</td>
                  <td className="px-6 py-4">{pedido.cliente}</td>
                  <td className="px-6 py-4">{pedido.produto}</td>
                  <td className="px-6 py-4">{pedido.status}</td>
                  <td className="px-6 py-4">{pedido.dataCriacao}</td>
                  <td className={exibirAcao ? 'px-1 py-4' : 'px-6 py-4'}>
                    {exibirAcao ? (
                      <button
                      onClick={() => handleFinalizarPedido(pedido.uuid)}
                        className={`font-medium px-4 py-2 rounded-md ${
                          pedido.status === 'Pendente'
                            ? 'bg-[#0CA47B] text-white hover:bg-[#08996F] transition-colors cursor-pointer'
                            : 'bg-gray-300 text-black cursor-not-allowed'
                        }`}
                        disabled={pedido.status !== 'Pendente'}
                      >
                        Finalizar
                      </button>
                    ) : (
                      pedido.dataAtualizacao
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
