import axios from 'axios'

const BASE_URL_CONSULTA = 'http://localhost:7049/api/pedidos'

export const clientesService = {

  async obterTodosClientes() {
    const res = await axios.get(`${BASE_URL_CONSULTA}/obterTodosClientes`)
    return res.data
  }

}