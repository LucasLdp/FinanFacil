import { createFileRoute } from '@tanstack/react-router'
import GaugeChart from 'react-gauge-chart'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { financialTips } from './-utils/finacial-tips'
import { useHealthTransaction } from '@/hooks/transactions/useHealthTransaction'

export const Route = createFileRoute('/home/informations')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, isError } = useHealthTransaction()

  // Mostrar loading enquanto carrega
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Saúde Financeira</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-sm text-gray-500">Carregando...</p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Dicas Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {financialTips.map((tip) => (
                  <AccordionItem key={tip.id} value={`item-${tip.id}`}>
                    <AccordionTrigger className="font-semibold text-left">
                      {tip.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">{tip.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Mostrar erro se houver falha no carregamento
  if (isError || !data?.results) {
    return (
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Saúde Financeira</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-red-500 font-medium">Erro ao carregar dados</p>
              <p className="text-sm text-gray-500 mt-2">
                Tente recarregar a página
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Dicas Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {financialTips.map((tip) => (
                  <AccordionItem key={tip.id} value={`item-${tip.id}`}>
                    <AccordionTrigger className="font-semibold text-left">
                      {tip.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">{tip.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } // Mostrar erro se houver falha no carregamento
  if (isError || !data?.results) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Saúde Financeira</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-red-500 font-medium">Erro ao carregar dados</p>
              <p className="text-sm text-gray-500 mt-2">
                Tente recarregar a página
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Dicas Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {financialTips.map((tip) => (
                  <AccordionItem key={tip.id} value={`item-${tip.id}`}>
                    <AccordionTrigger className="font-semibold">
                      {tip.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">{tip.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const percentage = data.results.percentage ?? 0
  // Normalizar para garantir que o valor está entre 0 e 1
  const normalizedPercentage = percentage > 1 ? percentage / 100 : percentage

  let corTexto = ''
  if (normalizedPercentage < 0.4) {
    corTexto = 'text-red-600'
  } else if (normalizedPercentage < 0.7) {
    corTexto = 'text-yellow-600'
  } else {
    corTexto = 'text-green-600'
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Saúde Financeira
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full max-w-xs">
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={3}
                colors={['#dc2626', '#facc15', '#16a34a']}
                percent={Math.max(0, Math.min(1, normalizedPercentage))}
                arcWidth={0.3}
                textColor="#000"
                needleColor="#111"
              />
            </div>
            <p className={`mt-4 font-medium text-center ${corTexto}`}>
              {data.results.message}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-2">
              Receitas: R$ {data.results.totalIncome?.toFixed(2) ?? '0.00'} |
              Despesas: R$ {data.results.totalExpenses?.toFixed(2) ?? '0.00'}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Dicas Financeiras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {financialTips.map((tip) => (
                <AccordionItem key={tip.id} value={`item-${tip.id}`}>
                  <AccordionTrigger className="font-semibold text-left text-sm sm:text-base">
                    {tip.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs sm:text-sm text-gray-700">
                      {tip.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
