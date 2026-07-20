import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { CheckCircle2, Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'
import { products } from '@/data/products'

export default function Contacts() {
  const [params] = useSearchParams()
  const preselected = params.get('product') ?? ''
  const [sent, setSent] = useState(false)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Свяжитесь с нами"
          title="Заказать продукцию или задать вопрос"
          sub="Отвечаем в мессенджерах быстрее, чем по телефону. Консультация по подбору — бесплатная."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Контакты */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="flex items-center gap-3 font-semibold text-ink">
                <MapPin className="h-5 w-5 text-gold" /> Адрес представительства
              </p>
              <p className="mt-2 pl-8 text-sm text-muted-foreground">г. Ижевск, Rux 68</p>
            </div>
            <a href="tel:+79000000000" className="block rounded-2xl border border-border bg-white p-6 shadow-sm transition-colors hover:border-gold">
              <p className="flex items-center gap-3 font-semibold text-ink">
                <Phone className="h-5 w-5 text-gold" /> Телефон
              </p>
              <p className="mt-2 pl-8 text-sm text-muted-foreground">+7 (900) 000-00-00 — Ольга</p>
            </a>
            <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer" className="block rounded-2xl border-2 border-jade/30 bg-mint/50 p-6 shadow-sm transition-colors hover:border-gold">
              <p className="flex items-center gap-3 font-semibold text-jade">
                <Send className="h-5 w-5" /> Telegram-канал «ФУРОР»
              </p>
              <p className="mt-2 pl-8 text-sm text-ink/70">Новости, график обучений, ответы на вопросы, заказ продукции</p>
            </a>
            <a href="https://wa.me/79000000000" target="_blank" rel="noreferrer" className="block rounded-2xl border border-border bg-white p-6 shadow-sm transition-colors hover:border-gold">
              <p className="flex items-center gap-3 font-semibold text-ink">
                <MessageCircle className="h-5 w-5 text-gold" /> WhatsApp
              </p>
              <p className="mt-2 pl-8 text-sm text-muted-foreground">Быстрый заказ и вопросы по продуктам</p>
            </a>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="flex items-center gap-3 font-semibold text-ink">
                <Clock className="h-5 w-5 text-gold" /> График работы
              </p>
              <p className="mt-2 pl-8 text-sm text-muted-foreground">
                Ежедневно 9:00–20:00 (МСК+1). Встречи команды — четверг, 18:30.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Карта: Ижевск"
                src="https://www.openstreetmap.org/export/embed.html?bbox=53.15%2C56.80%2C53.30%2C56.90&layer=mapnik&marker=56.8526%2C53.2045"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Форма заказа */}
          <div className="rounded-3xl border border-jade/20 bg-white p-8 shadow-md">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-jade" />
                <p className="mt-5 font-display text-2xl font-bold text-jade">Заявка отправлена!</p>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время для подтверждения заказа и согласования доставки.
                </p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <p className="font-display text-xl font-bold text-jade">Форма заказа</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Ваше имя" className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade" />
                  <input required type="tel" placeholder="Телефон" className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade" />
                </div>
                <select
                  defaultValue={preselected}
                  className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
                >
                  <option value="">— Выберите продукт —</option>
                  {products.map(p => (
                    <option key={p.slug} value={p.name}>{p.name}</option>
                  ))}
                  {preselected && !products.some(p => p.name === preselected) && (
                    <option value={preselected}>{preselected}</option>
                  )}
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="number" min={1} defaultValue={1} placeholder="Количество" className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade" />
                  <input placeholder="Город" className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade" />
                </div>
                <textarea placeholder="Комментарий (состояние, вопрос, пожелания по доставке)" rows={4} className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade" />
                <Button type="submit" size="lg" className="w-full jade-gradient text-white">
                  Отправить заявку <Send className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
