import { Link } from 'react-router'
import { ArrowRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/data/products'
import { fmtPrice, METHODS } from '@/data/products'

export function SectionTitle({ kicker, title, sub, light }: { kicker?: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && (
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? 'text-gold' : 'text-gold'}`}>{kicker}</p>
      )}
      <h2 className={`mt-2 font-display text-3xl font-bold md:text-4xl ${light ? 'text-white' : 'text-jade'}`}>{title}</h2>
      <div className="ornament-divider mx-auto mt-4 w-40" />
      {sub && <p className={`mt-4 ${light ? 'text-white/70' : 'text-muted-foreground'}`}>{sub}</p>}
    </div>
  )
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${p.slug}`} className="relative block aspect-square overflow-hidden bg-mint/40">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink shadow">
            {p.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {p.method.map(m => (
            <span key={m} className="inline-flex items-center gap-1 rounded-full bg-sage/50 px-2 py-0.5 text-[11px] font-semibold text-jade">
              <span className="text-gold">{METHODS[m].hieroglyph}</span> {METHODS[m].name}
            </span>
          ))}
        </div>
        <Link to={`/product/${p.slug}`} className="font-display text-lg font-bold leading-snug text-ink hover:text-jade">
          {p.name}
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.short}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className={`font-display text-xl font-bold ${p.price ? 'text-jade' : 'text-sm text-muted-foreground'}`}>
            {fmtPrice(p)}
          </span>
          <Button asChild size="sm" className="jade-gradient text-white">
            <Link to={`/product/${p.slug}`}>
              Подробнее <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="jade-gradient py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-white/80">{text}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gold-gradient font-semibold text-ink hover:opacity-90">
            <Link to="/contacts">Заказать продукцию <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer">
              <Send className="mr-2 h-4 w-4" /> Telegram «ФУРОР»
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Disclaimer() {
  return (
    <p className="rounded-xl border border-gold/40 bg-[#FBF6E7] p-4 text-xs leading-relaxed text-ink/70">
      <strong>Важно:</strong> продукты FOHOW — биологически активные добавки (БАД), не лекарства. Описанные случаи —
      опыт партнёров и потребителей, индивидуальные результаты могут отличаться. Перед применением, особенно при
      хронических заболеваниях, беременности и кормлении, проконсультируйтесь с врачом.
    </p>
  )
}
