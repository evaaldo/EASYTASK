import axios from 'axios'

const BASE_URL_CONSULTA = 'http://localhost:7049/api/pedidos'
const BASE_URL_CONSUMER = 'http://localhost:7152/api/pedidos'

export const pedidosService = {
  async obterValorTotal() {
    const res = await axios.get<number>(`${BASE_URL_CONSULTA}/obterValorTotal`)
    return res.data
  },

  async obterMediaPedidosPorCliente() {
    const res = await axios.get<number>(`${BASE_URL_CONSULTA}/obterMediaPedidosPorCliente`)
    return res.data
  },

  async obterQuantidadeTotal() {
    const res = await axios.get<number>(`${BASE_URL_CONSULTA}/obterQuantidadeTotal`)
    return res.data
  },

  async obterValorMedioPedidosPorCliente() {
    const res = await axios.get<number>(`${BASE_URL_CONSULTA}/obterValorMedioPedidosPorCliente`)
    return res.data
  },

  async obterTodosPedidos() {
    const res = await axios.get(`${BASE_URL_CONSULTA}/obterTodosPedidos`)
    return res.data
  },

  async obterQuantidadePorProduto() {
    const res = await axios.get(`${BASE_URL_CONSULTA}/obterQuantidadePorProduto`);
    return res.data
  },

  async finalizarPedido(id: string) {
    try {
      await axios.put(`${BASE_URL_CONSUMER}/finalizar/${id}`)
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error)
      throw error
    }
  },

  async criarPedido(clienteid: string, produtoid: string) {
    try {
      await axios.post(BASE_URL_CONSUMER, { clienteid, produtoid })
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error)
      throw error
    }
  }
}
