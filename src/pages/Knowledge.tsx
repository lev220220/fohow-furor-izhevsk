import { useState } from 'react'
import { Link } from 'react-router'
import {
  BookMarked, BookOpen, CheckCircle2, Clock3, GraduationCap, Lightbulb,
  Lock, MapPin, Puzzle, ShieldCheck, Hourglass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'
import ProtectedZone, { ProtectionNotice } from '@/components/ProtectedZone'
import { useAuth } from '@/lib/auth'
import { knowledgeBase } from '@/data/site'

const icons: Record<string, React.ElementType> = {
  BookOpen, GraduationCap, Lightbulb, Puzzle, MapPin, ShieldCheck,
}

export default function Knowledge() {
  const { user, hasAccess, requestAccess, myRequest } = useAuth()
  const [note, setNote] = useState('')
  const allowed = hasAccess('knowledge')
  const req = myRequest('team')

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Закрытая зона • для команды"
          title="База знаний «ФУРОР»"
          sub="Литература, школы, идеи и готовые решения. Бесплатно для подписчиков команды Ольги — по разрешению администратора."
        />

        {!user && (
          <div className="mx-auto mt-12 max-w-lg rounded-3xl border-2 border-gold/40 bg-white p-8 text-center shadow-xl">
            <Lock className="mx-auto h-10 w-10 text-gold" />
            <h3 className="mt-4 font-display text-xl font-bold text-jade">Войдите, чтобы продолжить</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              База знаний доступна зарегистрированным участникам после одобрения заявки Ольгой.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Button asChild className="jade-gradient text-white"><Link to="/login">Войти</Link></Button>
              <Button asChild variant="outline" className="border-jade text-jade"><Link to="/register">Регистрация</Link></Button>
            </div>
          </div>
        )}

        {user && !allowed && (
          <div className="mx-auto mt-12 max-w-lg rounded-3xl border-2 border-gold/40 bg-white p-8 shadow-xl">
            {req?.status === 'pending' ? (
              <div className="text-center">
                <Hourglass className="mx-auto h-10 w-10 text-gold" />
                <h3 className="mt-4 font-display text-xl font-bold text-jade">Заявка на рассмотрении</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ольга или модератор проверит вашу заявку и откроет доступ. Обычно это занимает до 24 часов.
                </p>
              </div>
            ) : req?.status === 'rejected' ? (
              <div className="text-center">
                <Lock className="mx-auto h-10 w-10 text-cinnabar" />
                <h3 className="mt-4 font-display text-xl font-bold text-cinnabar">Заявка отклонена</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  База знаний — для участников команды. Уточните детали у Ольги в Telegram и подайте заявку снова.
                </p>
                <Button className="mt-5 jade-gradient text-white" onClick={() => requestAccess('team', note || 'Повторная заявка')}>
                  Подать заявку повторно
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <BookMarked className="mx-auto h-10 w-10 text-jade" />
                  <h3 className="mt-4 font-display text-xl font-bold text-jade">Запросить доступ</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Вы вошли как <strong>{user.name}</strong> ({ROLE_HINT.registered}). Напишите пару слов о себе —
                    и Ольга откроет вам доступ.
                  </p>
                </div>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Например: я в команде Ольги с марта, участвую во встречах по четвергам…"
                  rows={3}
                  className="mt-5 w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
                />
                <Button
                  className="mt-4 w-full jade-gradient text-white"
                  onClick={() => requestAccess('team', note)}
                >
                  Отправить заявку Ольге
                </Button>
              </>
            )}
          </div>
        )}

        {allowed && (
          <ProtectedZone zoneName="База знаний">
            <div className="mt-8">
              <ProtectionNotice />
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {knowledgeBase.map(section => {
                const Icon = icons[section.icon] ?? BookOpen
                return (
                  <div key={section.id} className="rounded-2xl border border-border bg-white p-7 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint">
                        <Icon className="h-6 w-6 text-jade" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-jade">{section.title}</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                      {section.items.map(item => (
                        <div key={item.title} className="rounded-xl border border-border bg-porcelain/60 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-ink">{item.title}</p>
                            <span className="shrink-0 rounded-full bg-sage/60 px-2.5 py-0.5 text-[11px] font-bold text-jade">{item.tag}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-mint/60 p-4 text-sm text-jade">
              <CheckCircle2 className="h-4 w-4" />
              Вы вошли как {user?.name}. Материалы обновляются ежемесячно — следите за анонсами в канале «ФУРОР».
              <Clock3 className="ml-2 h-4 w-4" />
            </div>
          </ProtectedZone>
        )}
      </div>
    </div>
  )
}

const ROLE_HINT = { registered: 'зарегистрированный участник' } as const
