import { Link } from 'react-router'
import { ArrowRight, Gift, Percent, Sparkles, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'

const promos = [
  {
    title: 'Чай «Лювэй» в подарок',
    text: 'При заказе от 6 000 ₽ — коробка чая «Лювэй Феникс» (800 ₽) в подарок. Начните день с детокса.',
    icon: Gift,
    tag: 'Подарок к заказу',
  },
  {
    title: '«Золотая пара» со скидкой',
    text: 'Эликсир «Феникс» + «Сюэчинфу» — комплекс для сосудов и иммунитета. Вместе — экономия 500 ₽.',
    icon: Sparkles,
    tag: 'Комплекс месяца',
  },
  {
    title: '−50% на второй товар',
    text: 'При заказе от 10 000 ₽ — скидка 50% на второй (более дешёвый) товар в чеке.',
    icon: Percent,
    tag: 'Для больших заказов',
  },
  {
    title: '3 месяца консультаций при покупке БЭМ',
    text: 'Покупая биоэнергомассажёр, вы получаете обучение работе с прибором и 3 месяца сопровождения специалиста.',
    icon: Timer,
    tag: 'Приборы',
  },
]

export default function Promo() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Выгода для клиентов"
          title="Акции и спецпредложения"
          sub="Актуальные предложения представительства «ФУРОР». Подробности и сроки — уточняйте в Telegram или по телефону."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {promos.map(p => (
            <div key={p.title} className="chinese-corner rounded-2xl border-2 border-gold/40 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FBF3DC]">
                  <p.icon className="h-7 w-7 text-gold" />
                </span>
                <span className="rounded-full bg-sage/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-jade">{p.tag}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-jade">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <Button asChild className="mt-5 jade-gradient text-white">
                <Link to={`/contacts?product=${encodeURIComponent('Акция: ' + p.title)}`}>
                  Воспользоваться <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Акции не суммируются между собой. Актуальность предложений — на момент заказа, уточняйте у консультанта.
        </p>
      </div>
    </div>
  )
}
