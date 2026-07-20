import { Link } from 'react-router'
import { ArrowRight, Cpu, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle, Disclaimer } from '@/components/shared'
import { devices } from '@/data/devices'

export default function Devices() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Физиотерапия дома"
          title="Приборы и оборудование FOHOW"
          sub="Высокий средний чек — и высокая ценность: физиотерапевтический кабинет у вас дома. На каждый прибор — обучение и сопровождение представительства."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map(d => (
            <div key={d.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square overflow-hidden bg-mint/40">
                <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                {d.badge && (
                  <span className="absolute left-3 top-3 rounded-full gold-gradient px-3 py-1 text-[11px] font-bold uppercase text-ink shadow">{d.badge}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-oxygen">
                  <Cpu className="h-3.5 w-3.5" /> {d.tech}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-jade">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                <ul className="mt-3 space-y-1.5">
                  {d.effects.map(e => (
                    <li key={e} className="flex items-start gap-2 text-sm text-ink/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {e}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-display text-lg font-bold text-ink">{d.price}</span>
                  <Button asChild size="sm" className="jade-gradient text-white">
                    <Link to={`/contacts?product=${encodeURIComponent(d.name)}`}>
                      Консультация <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-cinnabar/40 bg-[#FDF1EF] p-5 text-sm text-ink/80">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-cinnabar" />
          <p>
            При острых воспалениях и температурах приборы с ИК-прогревом временно отменяют — начинайте после
            снятия острого периода. При онкологии применение приборов — только по согласованию с врачом.
          </p>
        </div>
        <div className="mt-6">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
