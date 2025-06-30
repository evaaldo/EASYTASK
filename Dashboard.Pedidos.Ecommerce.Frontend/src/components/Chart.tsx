import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { pedidosService } from '../services/pedidosService'
import type { ChartType } from './interfaces/ChartType'

export default function Chart() {
  const [data, setData] = useState<{ name: string, value: number }[]>([])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6680', '#66FFB3', '#FFA07A', '#B0C4DE', '#90EE90']

  useEffect(() => {
    async function carregarDados() {
      const resposta: ChartType[] = await pedidosService.obterQuantidadePorProduto()
      const dadosConvertidos = resposta.map(item => ({
        name: item.produto,
        value: item.quantidade
      }))
      setData(dadosConvertidos)
    }

    carregarDados()
  }, [])

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) =>
          `${name} (${(percent! * 100).toFixed(0)}%)`
        }
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}
