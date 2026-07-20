import { Link, useParams, Navigate } from 'react-router'
import {
  ArrowLeft, ArrowRight, BadgeCheck, ChevronDown, Clock, FlaskConical, Flame, HeartPulse,
  ListChecks, Send, ShieldAlert, ShoppingCart, Snowflake, Scale, Users,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Disclaimer, ProductCard } from '@/components/shared'
import { getProduct, fmtPrice, METHODS, products } from '@/data/products'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = slug ? getProduct(slug) : undefined
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  if (!p) return <Navigate to="/catalog" replace />

  const related = products.filter(x => x.slug !== p.slug && x.method.some(m => p.method.includes(m))).slice(0, 4)

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-jade">
          <ArrowLeft className="h-4 w-4" /> Весь каталог
        </Link>

        {/* Шапка продукта */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-white shadow-lg">
              <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
              {p.badge && (
                <span className="absolute left-4 top-4 rounded-full gold-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink shadow">
                  {p.badge}
                </span>
              )}
            </div>
            {p.gallery && p.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {p.gallery.map(g => (
                  <div key={g} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                    <img src={g} alt={`${p.name} — фото`} className="aspect-square w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {p.method.map(m => (
                <span key={m} className="inline-flex items-center gap-1.5 rounded-full bg-sage/60 px-3 py-1 text-xs font-semibold text-jade">
                  <span className="text-gold">{METHODS[m].hieroglyph}</span> Метод «{METHODS[m].name}»
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-jade">
                Арт. {p.art}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-jade">{p.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{p.short}</p>

            <div className="mt-6 flex items-end gap-4">
              <span className="font-display text-4xl font-bold text-ink">{fmtPrice(p)}</span>
              {p.price && <span className="pb-1 text-sm text-muted-foreground">актуальная цена представительства</span>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-mint/70 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-jade">
                  {p.temperature.includes('ол') || p.temperature.includes('рохла') ? <Snowflake className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
                  Природа по ТКМ
                </p>
                <p className="mt-1 font-medium text-ink">{p.temperature}</p>
              </div>
              <div className="rounded-xl bg-mint/70 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-jade">
                  <Users className="h-3.5 w-3.5" /> Кому подходит
                </p>
                <p className="mt-1 font-medium text-ink">{p.forWhom}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="jade-gradient px-8 text-white">
                <Link to={`/contacts?product=${encodeURIComponent(p.name)}`}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Заказать
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-gold text-ink hover:bg-gold/15">
                <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer">
                  <Send className="mr-2 h-5 w-5" /> Спросить в Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="font-display text-2xl font-bold text-jade">Что это и зачем</h2>
              <p className="mt-4 leading-relaxed text-ink/85">{p.lead}</p>
            </section>

            {/* Состав */}
            <section>
              <h2 className="font-display text-2xl font-bold text-jade">Состав: каждый компонент — не «для галочки»</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                {p.composition.map((c, i) => (
                  <div key={c.component} className={`grid gap-2 p-5 sm:grid-cols-[220px_1fr] ${i % 2 ? 'bg-mint/40' : 'bg-white'}`}>
                    <div className="font-semibold text-ink">
                      {c.component}
                      {c.share && <span className="ml-2 rounded-full gold-gradient px-2 py-0.5 text-xs font-bold text-ink">{c.share}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{c.why}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Для чего */}
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-jade">
                <HeartPulse className="h-6 w-6 text-gold" /> В каких случаях эффективен
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {p.effects.map(e => (
                  <div key={e} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 text-sm shadow-sm">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-jade" />
                    <span className="text-ink/85">{e}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Кейсы */}
            {p.cases.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-jade">Доказано практикой: случаи партнёров</h2>
                <div className="mt-5 space-y-3">
                  {p.cases.map(c => (
                    <div key={c.title} className="rounded-xl border-l-4 border-gold bg-white p-5 shadow-sm">
                      <p className="font-semibold text-ink">{c.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Комбинации */}
            {p.combos.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-jade">С чем усиливается эффект</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {p.combos.map(c => (
                    <Link
                      key={c.with}
                      to={c.withSlug ? `/product/${c.withSlug}` : '#'}
                      className="group rounded-xl border border-jade/20 bg-mint/50 p-4 transition-colors hover:border-gold hover:bg-mint"
                    >
                      <p className="font-semibold text-jade group-hover:text-gold">
                        {p.name.replace(/^Эликсир |^Капсулы |^Паста |^Чай |^Кальций |^Тампоны |^Таблетки /, '')} + {c.with} <ArrowRight className="ml-1 inline h-4 w-4" />
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.effect}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Наука */}
            {p.science && p.science.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-jade">
                  <FlaskConical className="h-6 w-6 text-gold" /> Что говорит наука
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">Китайская медицина объясняет «зачем», европейская наука — «как».</p>
                <div className="mt-5 space-y-3">
                  {p.science.map(s => (
                    <div key={s.ingredient} className="rounded-xl border border-jade/20 bg-mint/40 p-5">
                      <p className="text-sm font-bold uppercase tracking-wide text-jade">{s.ingredient}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{s.finding}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Для мужчин и женщин */}
            <section>
              <h2 className="font-display text-2xl font-bold text-jade">Как принимать: мужчине и женщине</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-jade/25 bg-white p-6">
                  <p className="flex items-center gap-2 font-display text-lg font-bold text-jade">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-base">♂</span> {p.forMen.who}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-ink">{p.forMen.dose}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.forMen.note}</p>
                </div>
                <div className="rounded-2xl border-2 border-gold/40 bg-white p-6">
                  <p className="flex items-center gap-2 font-display text-lg font-bold text-jade">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBF3DC] text-base">♀</span> {p.forWomen.who}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-ink">{p.forWomen.dose}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.forWomen.note}</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            {p.faq.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-jade">Частые вопросы</h2>
                <div className="mt-5 space-y-2">
                  {p.faq.map((f, i) => (
                    <div key={i} className="rounded-xl border border-border bg-white shadow-sm">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left font-semibold text-ink"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        {f.q}
                        <ChevronDown className={`h-5 w-5 text-jade transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && <p className="border-t px-4 py-3 text-sm text-muted-foreground">{f.a}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Боковая колонка */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-jade/25 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-jade">
                <Clock className="h-5 w-5 text-gold" /> Как принимать
              </h3>
              <ul className="mt-4 space-y-3">
                {p.dosage.map(d => (
                  <li key={d} className="flex items-start gap-2 text-sm text-ink/85">
                    <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-jade" /> {d}
                  </li>
                ))}
              </ul>
            </div>

            {p.contraindications && (
              <div className="rounded-2xl border border-cinnabar/40 bg-[#FDF1EF] p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-cinnabar">
                  <ShieldAlert className="h-5 w-5" /> Противопоказания
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">{p.contraindications}</p>
              </div>
            )}

            <div className="rounded-2xl border border-gold/40 bg-[#FBF6E7] p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-jade">
                <Scale className="h-5 w-5 text-gold" /> Сертификаты
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['GMP', 'FDA', 'EAC', 'HALAL', 'KOSHER'].map(c => (
                  <span key={c} className="rounded-full border border-gold/60 bg-white px-3 py-1 text-xs font-bold text-jade">{c}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Производство сертифицировано по международным стандартам. Документы — по запросу в представительстве.
              </p>
            </div>

            <div className="rounded-2xl jade-gradient p-6 text-white">
              <p className="font-display text-lg font-bold">Не уверены, что продукт ваш?</p>
              <p className="mt-2 text-sm text-white/80">
                Опишите ситуацию Ольге — подберём продукт и схему под вашу конституцию по ТКМ. Бесплатно.
              </p>
              <Button asChild className="mt-4 w-full gold-gradient font-semibold text-ink">
                <Link to={`/contacts?product=${encodeURIComponent(p.name)}`}>Получить консультацию</Link>
              </Button>
            </div>
          </aside>
        </div>

        {/* Похожие */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-jade">С этим продуктом смотрят</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(x => <ProductCard key={x.slug} p={x} />)}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
