import { useState } from 'react'
import { ArrowRight, CheckCircle2, Flame, Gift, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'
import trainingImg from '@/assets/training.jpg'

const reasons = [
  {
    title: 'НЕ ЗНАЕМ, но делаем',
    text: 'Работа наугад, миллион собственных ошибок. На тренинге вы получаете готовую формулу — вместо лет проб и провалов.',
  },
  {
    title: 'ЗНАЕМ, но НЕ ДЕЛАЕМ',
    text: 'Знания без применения. Учимся видеть свои ошибки, осваиваем навыки рекрутирования, находим причину стагнации.',
  },
  {
    title: 'ДЕЛАЕМ правильно, но НЕ ПОЛУЧАЕТСЯ',
    text: 'Самый коварный случай. Работаем с подсознанием: «наносим новую звуковую дорожку» — установки, которые дают результат.',
  },
]

const outcomes = [
  '4 шага привлечения новых партнёров',
  'Мощная сила внутри каждого — и инструкция по её использованию',
  'История Ольги: как она к этому пришла',
  'Навыки эффективного рекрутирования',
  'Выявление и устранение причины стагнации в бизнесе',
]

const bonuses = [
  { title: 'Школа карты желаний', desc: 'Двухчасовой практикум: составляем личную карту желаний, которая работает.' },
  { title: 'Брифинг «Вопросы и ответы»', desc: 'Три часа с авторами тренинга: разбор ваших реальных ситуаций.' },
]

const reviews = [
  { name: 'Наталья, Ижевск', text: 'Пришла «за компанию» — ушла с планом на 90 дней. Через 2 месяца закрыла первый цикл.' },
  { name: 'Дмитрий, Казань', text: '5 лет в бизнесе, думал, что знаю всё. Причина стагнации нашлась за первый же день.' },
  { name: 'Гузель, Уфа', text: 'Карта желаний из бонусной школы сработала дважды за полгода. Теперь веду этот тренинг у себя.' },
]

export default function Training() {
  const [sent, setSent] = useState(false)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Авторский тренинг Ольги и Олега Кирилловых"
          title="Тренинг «ФУРОР»"
          sub="Формула Успеха: Решение, Ответственность, Рост. Тренинг, после которого бизнес перестаёт быть «подвигом» и становится системой."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <img src={trainingImg} alt="Тренинг ФУРОР" className="rounded-3xl border-2 border-gold/30 shadow-xl" />
          <div>
            <h3 className="font-display text-2xl font-bold text-jade">Три причины неуспеха — и лекарство от каждой</h3>
            <div className="mt-6 space-y-4">
              {reasons.map((r, i) => (
                <div key={r.title} className="flex gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full jade-gradient font-display text-lg font-bold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl jade-gradient p-8 text-white">
            <h3 className="font-display text-2xl font-bold">Что получат участники</h3>
            <ul className="mt-5 space-y-3">
              {outcomes.map(o => (
                <li key={o} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-gold/50 bg-white p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-jade">
              <Gift className="h-6 w-6 text-gold" /> Бонусы только для участников
            </h3>
            <div className="mt-5 space-y-4">
              {bonuses.map(b => (
                <div key={b.title} className="rounded-xl bg-[#FBF6E7] p-5">
                  <p className="font-bold text-ink">{b.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Бонусы не продаются отдельно и не выдаются «посмотреть».</p>
          </div>
        </div>

        {/* Отзывы */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-bold text-jade">Участники о тренинге</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map(r => (
              <div key={r.name} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <Flame className="h-5 w-5 text-gold" />
                <p className="mt-3 text-sm italic text-ink/85">«{r.text}»</p>
                <p className="mt-4 text-xs font-semibold text-muted-foreground">{r.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Запись */}
        <div className="mt-16 grid gap-8 rounded-3xl border border-jade/20 bg-mint/50 p-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-jade">Календарь и запись</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Тренинг проходит в Ижевске и выездным форматом по городам. Ближайшие даты и города —
              в Telegram-канале «ФУРОР». Оставьте заявку — и мы сообщим о ближайшем тренинге первыми.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-jade">
              <MapPin className="h-4 w-4" /> Ижевск, Rux 68 + выездные города по графику
            </div>
            <Button asChild variant="outline" className="mt-5 border-jade text-jade">
              <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer">
                <Send className="mr-2 h-4 w-4" /> Смотреть даты в Telegram
              </a>
            </Button>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-jade" />
                <p className="mt-4 font-display text-xl font-bold text-jade">Заявка отправлена!</p>
                <p className="mt-2 text-sm text-muted-foreground">Мы свяжемся с вами и сообщим ближайшие даты тренинга.</p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={e => { e.preventDefault(); setSent(true) }}
              >
                <p className="font-display text-lg font-bold text-jade">Записаться на тренинг</p>
                <input required placeholder="Ваше имя" className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <input required type="tel" placeholder="Телефон" className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <input required placeholder="Город" className="w-full rounded-lg border border-input bg-white px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <Button type="submit" className="w-full jade-gradient text-white">
                  Отправить заявку <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
