import { Award, BadgeCheck, Building2, FlaskConical, Medal, Sprout, Trophy } from 'lucide-react'
import { SectionTitle, CtaBand } from '@/components/shared'
import { companyTimeline, companyStructure, companyLeaders, ambassadors } from '@/data/site'
import companyImg from '@/assets/company.jpg'

const certs = ['GMP', 'FDA', 'EAC', 'HALAL', 'KOSHER']

export default function Company() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Корпорация FOHOW"
          title="Наука Востока на службе здоровья"
          sub="Международная корпорация полного цикла: от собственных плантаций в заповедной зоне до готовой продукции. Без посредников и стороннего сырья."
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-gold/30 shadow-xl">
          <img src={companyImg} alt="НИИ Ян-Шэн" className="aspect-[21/9] w-full object-cover" />
        </div>

        {/* Хронология */}
        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-bold text-jade">История корпорации</h2>
          <div className="relative mx-auto mt-10 max-w-3xl">
            <div className="absolute left-[19px] top-0 h-full w-px bg-gold/50 md:left-1/2" />
            <div className="space-y-8">
              {companyTimeline.map((t, i) => (
                <div key={t.year} className={`relative flex items-start gap-6 md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:flex-row-reverse md:pr-10 md:text-right'}`}>
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full jade-gradient font-display text-[11px] font-bold text-gold shadow md:absolute md:left-1/2 md:-translate-x-1/2">
                    {t.year.slice(0, 4)}
                  </span>
                  <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                    <p className="font-display font-bold text-jade">{t.year}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Структура */}
        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-bold text-jade">Структура корпорации</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companyStructure.map((s, i) => (
              <div key={s.name} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                {i === 0 ? <FlaskConical className="h-7 w-7 text-gold" /> : i === 1 ? <Sprout className="h-7 w-7 text-gold" /> : <Building2 className="h-7 w-7 text-gold" />}
                <p className="mt-3 font-display font-bold text-jade">{s.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Руководство */}
        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-bold text-jade">Руководство</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {companyLeaders.map(l => (
              <div key={l.name} className="chinese-corner rounded-2xl border border-gold/30 bg-white p-7 text-center shadow-sm">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full jade-gradient font-display text-2xl font-bold text-gold">
                  {l.name[0]}
                </span>
                <p className="mt-4 font-display text-xl font-bold text-jade">{l.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{l.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Сертификаты и амбассадоры */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-jade">
              <BadgeCheck className="h-6 w-6 text-gold" /> Сертификация
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {certs.map(c => (
                <span key={c} className="rounded-full border-2 border-gold/50 bg-[#FBF6E7] px-5 py-2 font-display font-bold text-jade">{c}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Производство сертифицировано по международным стандартам качества, включая требования
              для фармацевтических предприятий (GMP) и рынков ЕАЭС, США и Европы.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-jade">
              <Trophy className="h-6 w-6 text-gold" /> Спортивные амбассадоры
            </h3>
            <div className="mt-5 space-y-3">
              {ambassadors.map(a => (
                <div key={a.name} className="flex items-center gap-4 rounded-xl bg-mint/50 p-4">
                  <Medal className="h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <p className="font-semibold text-ink">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="h-4 w-4 text-gold" /> Спортсмены выбирают FOHOW за чистоту составов и восстановление.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CtaBand
          title="Продукция, которой доверяют в 88 странах"
          text="Попробуйте флагманы линейки — эликсиры на кордицепсе. Консультация и подбор по конституции — бесплатно."
        />
      </div>
    </div>
  )
}
