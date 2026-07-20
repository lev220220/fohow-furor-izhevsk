import { useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight, Car, CheckCircle2, ChevronRight, Coins, Gem, GraduationCap,
  HeartHandshake, Home, Plane, ShieldCheck, TrendingUp, Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'
import { ranks, cycleStages } from '@/data/site'

const numbers = [
  { value: '88', label: 'стран присутствия', icon: Users },
  { value: '12,5 млн', label: 'потребителей', icon: TrendingUp },
  { value: '1000+', label: 'филиалов', icon: ShieldCheck },
  { value: '30 лет', label: 'на рынке', icon: Gem },
]

const fita = [
  { level: 'Начальный уровень', term: '2 дня', price: '10 F$', topics: 'Продукция, базовые понятия ТКМ, первые шаги в бизнесе' },
  { level: 'Средний уровень', term: '3 дня', price: '50 F$', topics: 'Маркетинг-план, лидерство, психология, косметология' },
]

const triggers = [
  { q: '«У меня нет опыта в продажах»', a: 'И не нужен. У нас система: тренинг «ФУРОР», готовые скрипты, наставник на первые 30 дней. Вы не продаёте — вы делитесь тем, что сами используете.' },
  { q: '«Это пирамида?»', a: 'Нет. Пирамиды платят за привлечение людей. FOHOW платит за оборот продукции, которую люди реально покупают и любят 30 лет. Есть товар, сертификаты, производство и потребитель.' },
  { q: '«Я не хочу навязываться знакомым»', a: 'Мы тоже. Методика — не «впаривание», а консультация: человек сам приходит с запросом (усталость, давление, суставы), вы помогаете подобрать продукт. Клиенты остаются надолго.' },
  { q: '«Сколько можно заработать честно?»', a: 'Первые цели — 30–60 тыс. ₽/мес на частичной занятости. Ранг Алмаз — около €7 000/мес. Но главное — пассивный доход со структуры, которая работает без вашего ежедневного участия.' },
  { q: '«А если не получится?»', a: 'Вы останетесь с продукцией, которая улучшит ваше здоровье, и с навыками, которые работают везде. Вход — от €300, это не квартира в ипотеку. Риск минимален, потолок — нет.' },
]

const family = [
  { icon: Home, title: 'Семья, а не структура', text: 'Ольга и Олег ведут команду как семью: «поднимают за головку и пускают в путь». Никто не остаётся один на один с вопросами.' },
  { icon: HeartHandshake, title: 'Наставник с первого дня', text: 'За вами закрепляют наставника. Первые продажи и приглашения — вместе, рука об руку, пока не встанете на ноги.' },
  { icon: Users, title: 'Живое общение', text: 'Еженедельные встречи в Ижевске, выездные школы, общий чат. Люди, которые болеют одним делом и радуются вашим победам.' },
  { icon: TrendingUp, title: 'Рост по системе', text: 'Тренинг «ФУРОР», школа FITA, личное лидерство. Вы растёте не только в доходе, но и как личность — это главный капитал.' },
]

export default function Business() {
  const [sent, setSent] = useState(false)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Бизнес с FOHOW"
          title="Присоединяйтесь к семье «ФУРОР»"
          sub="Не «работа в сетевом», а своё дело рядом с людьми, которые вас поддержат. Открыто о маркетинг-плане — считайте сами."
        />

        {/* Цифры */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {numbers.map(n => (
            <div key={n.label} className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
              <n.icon className="mx-auto h-7 w-7 text-gold" />
              <p className="mt-2 font-display text-3xl font-bold text-jade">{n.value}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{n.label}</p>
            </div>
          ))}
        </div>

        {/* Семья */}
        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-bold text-jade">Почему у нас — как в семье</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Представительство в Ижевске ведут Ольга и Олег Кирилловы — муж и жена. Они строят команду по семейному принципу.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {family.map(f => (
              <div key={f.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint">
                  <f.icon className="h-6 w-6 text-jade" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-jade">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Триггеры / Возражения */}
        <div className="mt-16 rounded-3xl bg-mint/50 p-8 md:p-12">
          <h2 className="text-center font-display text-3xl font-bold text-jade">Честные ответы на ваши сомнения</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Мы сами когда-то задавали эти вопросы. Вот ответы без воды.
          </p>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {triggers.map(t => (
              <div key={t.q} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="font-display text-lg font-bold text-jade">{t.q}</p>
                <p className="mt-2 leading-relaxed text-ink/85">{t.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Маркетинг-план */}
        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-bold text-jade">Маркетинг-план: 9 рангов</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Бинарная система: вы строите две ветки, корпорация платит за сбалансированный оборот продукции.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="jade-gradient text-left text-white">
                  <th className="px-5 py-3.5 font-display">Ранг</th>
                  <th className="px-5 py-3.5 font-display">Условие</th>
                  <th className="px-5 py-3.5 font-display">Доход</th>
                </tr>
              </thead>
              <tbody>
                {ranks.map((r, i) => (
                  <tr key={r.rank} className={i % 2 ? 'bg-mint/40' : 'bg-white'}>
                    <td className="px-5 py-3 font-semibold text-jade">{r.rank}</td>
                    <td className="px-5 py-3 text-ink/80">{r.condition}</td>
                    <td className="px-5 py-3 font-medium text-ink">{r.income}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Цикл */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-jade">Структура одного цикла</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Цикл — это закрытый объём из 72 закупок в ваших двух ветках. Выплаты идут по этапам,
              не дожидаясь конца цикла: деньги приходят по мере роста структуры.
            </p>
            <div className="mt-6 space-y-2">
              {cycleStages.map(s => (
                <div key={s.stage} className="flex items-center justify-between rounded-xl border border-border bg-white px-5 py-3 shadow-sm">
                  <span className="font-semibold text-jade">{s.stage}</span>
                  <span className="text-xs text-muted-foreground">{s.ratio}</span>
                  <span className="font-display font-bold text-ink">{s.payout}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-jade">
                <Coins className="h-4 w-4 text-gold" /> Реферальный бонус 10%
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-jade">
                <Car className="h-4 w-4 text-gold" /> Автомобильная программа
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-jade">
                <Plane className="h-4 w-4 text-gold" /> Призовые поездки
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-gold/40 bg-white p-7 shadow-sm">
              <h3 className="font-display text-xl font-bold text-jade">Вход в бизнес</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-mint/60 p-5 text-center">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Стартовый пакет</p>
                  <p className="mt-1 font-display text-2xl font-bold text-jade">~€300</p>
                  <p className="text-xs text-muted-foreground">1 позиция в структуре</p>
                </div>
                <div className="rounded-xl gold-gradient p-5 text-center">
                  <p className="text-xs uppercase tracking-wide text-ink/70">Полная лицензия</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">~€750</p>
                  <p className="text-xs text-ink/70">7 позиций — максимальный потенциал</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-jade">
                <GraduationCap className="h-5 w-5 text-gold" /> Система обучения FITA
              </h3>
              <div className="mt-4 space-y-3">
                {fita.map(f => (
                  <div key={f.level} className="rounded-xl bg-mint/50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-ink">{f.level}</p>
                      <p className="text-sm font-bold text-jade">{f.term} • {f.price}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{f.topics}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Форма */}
        <div className="mt-16 grid gap-8 rounded-3xl border border-jade/20 bg-mint/50 p-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-jade">Сделайте первый шаг</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Оставьте заявку — и Ольга или Олег лично свяжутся с вами. Расскажут, как всё устроено,
              ответят на вопросы и помогут решить, подходит ли вам этот путь. Без давления и обязательств.
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                'Знакомство и ответы на вопросы — бесплатно',
                'Поможем подобрать стартовый набор под ваши цели',
                'Первые 30 дней — рядом наставник',
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jade" /> {i}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6 border-jade text-jade">
              <Link to="/training">Про тренинг «ФУРОР» <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-jade" />
                <p className="mt-4 font-display text-xl font-bold text-jade">Заявка принята!</p>
                <p className="mt-2 text-sm text-muted-foreground">Ольга или Олег свяжутся с вами для знакомства.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <p className="font-display text-lg font-bold text-jade">Хочу в семью «ФУРОР»</p>
                <input required placeholder="Ваше имя" className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <input required type="tel" placeholder="Телефон" className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <input required placeholder="Город" className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <select className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm text-muted-foreground outline-none focus:border-jade" defaultValue="">
                  <option value="" disabled>Что вас интересует?</option>
                  <option>Дополнительный доход</option>
                  <option>Свой бизнес и свобода</option>
                  <option>Здоровье своё и близких</option>
                  <option>Общение и окружение</option>
                </select>
                <Button type="submit" className="w-full jade-gradient text-white">
                  Оставить заявку <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
