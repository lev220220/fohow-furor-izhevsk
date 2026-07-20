import { Link } from 'react-router'
import { ArrowRight, Clock3 } from 'lucide-react'
import { SectionTitle, Disclaimer } from '@/components/shared'
import { programs } from '@/data/programs'

export default function Programs() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Программы здоровья"
          title="Комплексы по состоянию"
          sub="Готовые схемы приёма продукции FOHOW: что, сколько и как долго принимать в конкретной ситуации. Составлены по системе Ян-Шэн и проверены практикой представительства."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(pr => (
            <Link
              key={pr.slug}
              to={`/programs/${pr.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-xl"
            >
              <h3 className="font-display text-xl font-bold leading-snug text-jade group-hover:text-gold">
                {pr.title}
              </h3>
              <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">{pr.problem}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pr.complex.map(c => (
                  <span key={c.slug} className="rounded-full bg-sage/50 px-2.5 py-0.5 text-[11px] font-semibold text-jade">
                    {c.product}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5" /> {pr.duration}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-jade group-hover:text-gold">
                  Схема приёма <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
