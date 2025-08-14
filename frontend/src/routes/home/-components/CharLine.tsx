'use client'

import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { IMonthlyAverage } from '@/dtos/ITransaction'

export const description = 'A linear line chart'

const chartConfig = {
  averageValue: {
    label: 'Valor Médio',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface ChartLineProps {
  data?: IMonthlyAverage[]
}

export function ChartLine({ data }: ChartLineProps) {
  // Função para formatar o nome do mês
  const formatMonthName = (monthStr: string): string => {
    try {
      // Se for formato "YYYY-MM", converte para data e formata
      if (monthStr.includes('-') && monthStr.length === 7) {
        const [year, month] = monthStr.split('-')
        const date = new Date(parseInt(year), parseInt(month) - 1)
        return date
          .toLocaleDateString('pt-BR', { month: 'short' })
          .replace('.', '')
      }

      // Se já for um nome de mês, retorna as primeiras 3 letras
      if (monthStr.length > 3) {
        return monthStr.substring(0, 3)
      }

      return monthStr
    } catch {
      return monthStr.substring(0, 3)
    }
  }

  // Função para ordenar os dados cronologicamente
  const sortDataChronologically = (
    data: IMonthlyAverage[],
  ): IMonthlyAverage[] => {
    return [...data].sort((a, b) => {
      try {
        // Se for formato "YYYY-MM", compara diretamente
        if (a.month.includes('-') && b.month.includes('-')) {
          return a.month.localeCompare(b.month)
        }

        // Se for nome do mês, converte para número do mês para comparar
        const monthNames = [
          'jan',
          'fev',
          'mar',
          'abr',
          'mai',
          'jun',
          'jul',
          'ago',
          'set',
          'out',
          'nov',
          'dez',
        ]

        const monthA = monthNames.indexOf(a.month.toLowerCase().substring(0, 3))
        const monthB = monthNames.indexOf(b.month.toLowerCase().substring(0, 3))

        return monthA - monthB
      } catch {
        return 0
      }
    })
  }

  // Dados padrão para quando não há dados ou está carregando
  const defaultChartData = useMemo(() => [
    { month: 'Jan', averageValue: 0 },
    { month: 'Fev', averageValue: 0 },
    { month: 'Mar', averageValue: 0 },
    { month: 'Abr', averageValue: 0 },
    { month: 'Mai', averageValue: 0 },
    { month: 'Jun', averageValue: 0 },
  ], [])

  const chartData = useMemo(() => {
    return data?.length
      ? sortDataChronologically(data).map((item) => ({
          month: formatMonthName(item.month),
          averageValue: item.averageValue,
        }))
      : defaultChartData
  }, [data, defaultChartData])
  return (
    <Card className="bg-green-ment">
      <CardHeader>
        <CardTitle>Gráfico de Área - Média Mensal</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeWidth={1} stroke="#d8dce2" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="averageValue"
              type="linear"
              stroke="var(--color-averageValue)"
              strokeWidth={2}
              fill="var(--color-averageValue)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
