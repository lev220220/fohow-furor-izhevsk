import { useState } from 'react'
import { Link } from 'react-router'
import {
  BarChart3, Camera, CheckCircle2, Clapperboard, Crown, Eye, Hourglass,
  Lock, MessagesSquare, PenSquare, Presentation, Scale, TrendingUp, X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'
import ProtectedZone, { ProtectionNotice } from '@/components/ProtectedZone'
import { useAuth } from '@/lib/auth'
import { marketingZone } from '@/data/site'

const icons: Record<string, React.ElementType> = {
  Presentation, MessagesSquare, BarChart3, PenSquare, Clapperboard, Camera, Scale, TrendingUp,
}

const plans = [
  { id: 'month', name: 'Месяц', price: '1 500 ₽', per: 'в месяц', note: 'Знакомство с зоной' },
  { id: 'quarter', name: 'Квартал', price: '3 900 ₽', per: 'за 3 месяца', note: 'Выгода 13%', featured: true },
  { id: 'year', name: 'Год', price: '12 000 ₽', per: 'в год', note: 'Выгода 33% + аналитика рынка' },
]

export default function Marketing() {
  const { user, hasAccess, requestAccess, myRequest } = useAuth()
  const [plan, setPlan] = useState('quarter')
  const [info, setInfo] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const allowed = hasAccess('marketing')
  const req = myRequest('partner')

  const active = marketingZone.find(m => m.id === preview)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Закрытая зона • подписка"
          title="Маркетинг-зона «ФУРОР»"
          sub="Готовые маркетинговые материалы для представительств FOHOW: презентации, скрипты, инфографика, посты, фото. Просмотр без копирования и скачивания."
        />

        {/* Не вошёл */}
        {!user && (
          <div className="mx-auto mt-12 max-w-lg rounded-3xl border-2 border-gold/40 bg-white p-8 text-center shadow-xl">
            <Lock className="mx-auto h-10 w-10 text-gold" />
            <h3 className="mt-4 font-display text-xl font-bold text-jade">Войдите, чтобы оформить подписку</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Маркетинг-зона доступна лидерам и партнёрам представительств FOHOW по платной подписке.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Button asChild className="jade-gradient text-white"><Link to="/login">Войти</Link></Button>
              <Button asChild variant="outline" className="border-jade text-jade"><Link to="/register">Регистрация</Link></Button>
            </div>
          </div>
        )}

        {/* Вошёл, нет доступа */}
        {user && !allowed && (
          <div className="mt-12">
            {req?.status === 'pending' ? (
              <div className="mx-auto max-w-lg rounded-3xl border-2 border-gold/40 bg-white p-8 text-center shadow-xl">
                <Hourglass className="mx-auto h-10 w-10 text-gold" />
                <h3 className="mt-4 font-display text-xl font-bold text-jade">Подписка активируется</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Мы получили вашу заявку ({req.note}). После подтверждения оплаты администратор откроет доступ.
                  Реквизиты для оплаты отправим вам в мессенджер.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-3">
                  {plans.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className={`rounded-2xl border-2 p-7 text-left transition-all ${
                        plan === p.id ? 'border-gold bg-[#FBF6E7] shadow-lg' : 'border-border bg-white hover:border-gold/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-display text-lg font-bold text-jade">{p.name}</p>
                        {p.featured && <span className="rounded-full gold-gradient px-2.5 py-0.5 text-[11px] font-bold text-ink">Выбор лидеров</span>}
                      </div>
                      <p className="mt-3 font-display text-3xl font-bold text-ink">{p.price}</p>
                      <p className="text-sm text-muted-foreground">{p.per}</p>
                      <p className="mt-2 text-xs font-semibold text-gold">{p.note}</p>
                    </button>
                  ))}
                </div>
                <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-white p-7 shadow-sm">
                  <p className="font-display text-lg font-bold text-jade">Данные для активации</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Укажите ваше представительство и ранг — администратор проверит заявку.
                  </p>
                  <textarea
                    value={info}
                    onChange={e => setInfo(e.target.value)}
                    placeholder="Например: представительство Казань, ранг Сапфир, структура 40 человек…"
                    rows={3}
                    className="mt-4 w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
                  />
                  <Button
                    className="mt-4 w-full gold-gradient font-semibold text-ink"
                    onClick={() =>
                      requestAccess('partner', `Тариф «${plans.find(p => p.id === plan)?.name}» — ${info || 'без комментария'}`)
                    }
                  >
                    <Crown className="mr-2 h-4 w-4" /> Оформить подписку — {plans.find(p => p.id === plan)?.price}
                  </Button>
                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    В рабочей версии сайта здесь подключается онлайн-оплата: доступ открывается автоматически после платежа.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Доступ открыт */}
        {allowed && (
          <ProtectedZone zoneName="Маркетинг-зона">
            <div className="mt-8">
              <ProtectionNotice />
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {marketingZone.map(m => {
                const Icon = icons[m.icon] ?? Presentation
                return (
                  <div key={m.id} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBF3DC]">
                        <Icon className="h-6 w-6 text-gold" />
                      </span>
                      <span className="rounded-full bg-sage/60 px-2.5 py-0.5 text-[11px] font-bold text-jade">{m.count}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-jade">{m.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.desc}</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-jade text-jade hover:bg-mint"
                      onClick={() => setPreview(m.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> Открыть просмотр
                    </Button>
                  </div>
                )
              })}
            </div>

            {/* Защищённый просмотр */}
            {active && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4" onClick={() => setPreview(null)}>
                <div
                  className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <button className="absolute right-4 top-4 rounded-full p-2 hover:bg-mint" onClick={() => setPreview(null)}>
                    <X className="h-5 w-5 text-jade" />
                  </button>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold">Защищённый просмотр • {user?.name}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-jade">{active.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{active.desc}</p>
                  <div className="mt-5 rounded-xl bg-mint/50 p-5 text-sm text-ink/80">
                    <p className="font-semibold text-jade">Внутри раздела:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Полные версии материалов ({active.count}) с ежемесячным обновлением</li>
                      <li>Авторские комментарии Ольги: как и когда применять каждый материал</li>
                      <li>Разборы реальных кейсов использования в структуре «ФУРОР»</li>
                    </ul>
                  </div>
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-[#FBF6E7] p-3 text-xs text-ink/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    Просмотр только на экране: скачивание, печать и копирование отключены. Страница помечена
                    вашими персональными водяными знаками.
                  </p>
                </div>
              </div>
            )}
          </ProtectedZone>
        )}
      </div>
    </div>
  )
}
