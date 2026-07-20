import { useState } from 'react'
import { HeartPulse, Quote } from 'lucide-react'
import { SectionTitle, Disclaimer } from '@/components/shared'
import { reviews, reviewCategories } from '@/data/reviews'
import { cn } from '@/lib/utils'

export default function Reviews() {
  const [cat, setCat] = useState('Все')
  const filtered = cat === 'Все' ? reviews : reviews.filter(r => r.category === cat)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Социальное доказательство"
          title="Отзывы с именами, диагнозами и цифрами"
          sub="Мы не публикуем отзывы без имени, возраста, города и показателей. Только реальные истории партнёров и клиентов — с цифрами «до» и «после»."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {reviewCategories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                cat === c ? 'jade-gradient border-transparent text-white' : 'border-jade/30 bg-white text-jade hover:bg-mint',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(r => (
            <div key={r.name + r.category} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <Quote className="h-6 w-6 text-gold" />
                <span className="rounded-full bg-sage/60 px-2.5 py-0.5 text-[11px] font-bold text-jade">{r.category}</span>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cinnabar">{r.diagnosis}</p>
              <p className="mt-2 text-sm text-muted-foreground">Продукты: {r.used}</p>
              <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-ink">
                <HeartPulse className="mr-1 inline h-4 w-4 text-jade" /> {r.result}
              </p>
              <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-ink">{r.name}</span>, {r.age} лет • {r.city}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Disclaimer />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Результаты индивидуальны и зависят от состояния, регулярности приёма и образа жизни.
        </p>
      </div>
    </div>
  )
}
