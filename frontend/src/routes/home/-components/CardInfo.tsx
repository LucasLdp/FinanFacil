interface ICardInfoProps {
  title: string
  value: string
}

export function CardInfo({ title, value }: ICardInfoProps) {
  return (
    <article className="flex flex-col rounded-md bg-green-ment p-4 py-8 gap-3 justify-center">
      <h4 className="font-semibold text-md">{title}</h4>
      <span className="text-2xl font-bold ">R$ {value}</span>
    </article>
  )
}
