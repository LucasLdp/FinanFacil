import { CardInfo } from '@/routes/home/-components/CardInfo'
import { createFileRoute } from '@tanstack/react-router'
import { ChartLine } from './-components/CharLine'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <section className="flex flex-col gap-6">
        <article className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Informações</h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardInfo title="Teste" value="1000" />
            <CardInfo title="Teste" value="1000" />
            <CardInfo title="Teste" value="1000" />
          </div>
        </article>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartLine />
          <CardInfo title="Teste" value="1000" />
        </article>
      </section>
    </>
  )
}
