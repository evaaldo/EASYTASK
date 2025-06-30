import type { PedidoType } from "./PedidoType"

export interface TabelaPedidosType {
  pedidos: PedidoType[]
  exibirAcao?: boolean
  alturaMaxima?: string
}