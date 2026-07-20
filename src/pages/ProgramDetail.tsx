import { Link, useParams, Navigate } from 'react-router'
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, ShieldAlert, ShoppingCart, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Disclaimer } from '@/components/shared'
import { programs } from '@/data/programs'
import { getProduct, fmtPrice } from '@/data/products'

export default function ProgramDetail() {
  const { slug } = useParams()
  const pr = programs.find(x => x.slug === slug)
  if (!pr) return <Navigate to="/programs" replace />

  const total = pr.complex.reduce((sum, c) => {
    const p = getProduct(c.slug)
    return sum + (p?.price ?? 0)
  }, 0)

  return (
    <div className="py-10">
      <div className="mx-auto max-w-5xl px-4">
        <Link to="/programs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-jade">
          <ArrowLeft className="h-4 w-4" /> Все программы
        </Link>

        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-jade">{pr.title}</h1>

        <div className="mt-8 rounded-2xl border border-border bg-white p-7 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-jade">
            <Target className="h-5 w-5 text-gold" /> Суть проблемы
          </h2>
          <p className="mt-3 leading-relaxed text-ink/85">{pr.problem}</p>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-jade/25 bg-white p-7 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-jade">
            <ShoppingCart className="h-5 w-5 text-gold" /> Рекомендуемый комплекс
          </h2>
          <div className="mt-4 space-y-3">
            {pr.complex.map(c => {
              const prod = getProduct(c.slug)
              return (
                <div key={c.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-mint/50 p-4">
                  <div>
                    <Link to={`/product/${c.slug}`} className="font-semibold text-jade hover:text-gold hover:underline">
                      {c.product}
                    </Link>
                    <p className="text-sm text-muted-foreground">{c.dose}</p>
                  </div>
                  {prod && (
                    <span className="font-display text-lg font-bold text-ink">{fmtPrice(prod)}</span>
                  )}
                </div>
              )
            })}
          </div>
          {total > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
              <p className="text-sm text-muted-foreground">
                Ориентировочная стоимость комплекса: <span className="font-display text-2xl font-bold text-jade">{total.toLocaleString('ru-RU')} ₽</span>
              </p>
              <Button asChild className="jade-gradient text-white">
                <Link to={`/contacts?product=${encodeURIComponent('Комплекс: ' + pr.title)}`}>
                  Заказать комплекс <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-jade">
              <ClipboardList className="h-5 w-5 text-gold" /> Схема приёма
            </h2>
            <ul className="mt-4 space-y-3">
              {pr.scheme.map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink/85">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-mint/60 p-3 text-sm font-semibold text-jade">Курс: {pr.duration}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-jade">
              <CheckCircle2 className="h-5 w-5 text-gold" /> Ожидаемые результаты
            </h2>
            <ul className="mt-4 space-y-3">
              {pr.results.map(r => (
                <li key={r} className="flex items-start gap-2 text-sm text-ink/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jade" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {pr.note && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-cinnabar/40 bg-[#FDF1EF] p-5 text-sm text-ink/80">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-cinnabar" />
            <p>{pr.note}</p>
          </div>
        )}

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
