import { useEffect, useState } from "react"
import { pedidosService } from "../services/pedidosService"
import { clientesService } from "../services/clientesService"
import { produtosService } from "../services/produtosService"

interface Cliente {
  id: string
  nome: string
}

interface Produto {
  id: string
  nome: string
}

export function Formulario() {
  const [cliente, setCliente] = useState("")
  const [produto, setProduto] = useState("")
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    async function carregarDados() {
      const clientesApi = await clientesService.obterTodosClientes()
      const produtosApi = await produtosService.obterTodosProdutos()
      setClientes(clientesApi)
      setProdutos(produtosApi)
    }

    carregarDados()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await pedidosService.criarPedido(cliente, produto)
      alert("Pedido cadastrado com sucesso!")
      setCliente("")
      setProduto("")
    } catch (error) {
      alert("Erro ao cadastrar pedido.")
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl bg-white p-8 rounded-lg shadow-xl mx-auto mt-10 flex flex-col gap-6"
    >
      <h2 className="text-xl font-bold text-[#5C5CDA]">Cadastro de Pedido</h2>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1 text-gray-700" htmlFor="cliente">
          Cliente
        </label>
        <select
          id="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C5CDA]"
          required
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cli) => (
            <option key={cli.id} value={cli.id}>
              {cli.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1 text-gray-700" htmlFor="produto">
          Produto
        </label>
        <select
          id="produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C5CDA]"
          required
        >
          <option value="">Selecione um produto</option>
          {produtos.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nome}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-[#5C5CDA] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#4a4acb] transition-colors self-start cursor-pointer"
      >
        Cadastrar
      </button>
    </form>
  )
}
