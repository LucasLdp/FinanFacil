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

export const Route = createFileRoute('/home/informations')({
  component: RouteComponent,
})

function RouteComponent() {
  const receitas = 5000
  const despesas = 3500

  const saldo = receitas - despesas
  const percentual = receitas > 0 ? saldo / receitas : 0

  let corTexto = 'text-green-600'
  let mensagem = 'Parabéns! Você está poupando bem.'

  if (percentual < 0) {
    corTexto = 'text-red-600'
    mensagem = 'Atenção! Você gastou mais do que ganhou.'
  } else if (percentual < 0.5) {
    corTexto = 'text-yellow-600'
    mensagem = 'Cuidado, sua poupança está baixa.'
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Saúde Financeira</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <GaugeChart
              id="gauge-chart"
              nrOfLevels={3}
              colors={['#dc2626', '#facc15', '#16a34a']}
              percent={Math.max(0, Math.min(1, percentual))}
              arcWidth={0.3}
              textColor="#000"
              needleColor="#111"
            />
            <p className={`mt-4 font-medium ${corTexto}`}>{mensagem}</p>
            <p className="text-sm text-gray-500">
              Receitas: R$ {receitas.toFixed(2)} | Despesas: R${' '}
              {despesas.toFixed(2)}
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
