import { Quote, Stethoscope } from 'lucide-react'
import { SectionTitle, Disclaimer } from '@/components/shared'
import { doctors } from '@/data/site'

export default function Doctors() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Мнение специалистов"
          title="Врачи о продукции FOHOW"
          sub="Практикующие врачи с многолетним стажем о месте продукции FOHOW в профилактике и поддержке здоровья."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {doctors.map(d => (
            <div key={d.name} className="chinese-corner rounded-2xl border border-border bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full jade-gradient">
                  <Stethoscope className="h-7 w-7 text-gold" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-jade">{d.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">{d.spec} • {d.exp}</p>
                </div>
              </div>
              <blockquote className="mt-5 flex gap-3">
                <Quote className="h-6 w-6 shrink-0 text-gold" />
                <p className="text-sm italic leading-relaxed text-ink/85">{d.quote}</p>
              </blockquote>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Мнения врачей носят экспертный характер и не являются назначением. Продукты FOHOW — БАД, не лекарства.
        </p>
      </div>
    </div>
  )
}
