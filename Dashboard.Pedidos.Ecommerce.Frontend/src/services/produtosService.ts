import axios from 'axios'

const BASE_URL_CONSULTA = 'http://localhost:7049/api/pedidos'

export const produtosService = {

  async obterTodosProdutos() {
    const res = await axios.get(`${BASE_URL_CONSULTA}/obterTodosProdutos`)
    return res.data
  }

}