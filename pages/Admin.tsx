import { Navigate } from 'react-router'
import { BookMarked, Check, Crown, ShieldCheck, Users, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared'
import { useAuth, ROLE_LABELS } from '@/lib/auth'

export default function Admin() {
  const { user, users, requests, approveRequest, rejectRequest } = useAuth()

  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />

  const pending = requests.filter(r => r.status === 'pending')
  const decided = requests.filter(r => r.status !== 'pending')

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          kicker="Панель администратора"
          title={`Здравствуйте, ${user.name.split(' ')[0]}!`}
          sub="Управление доступами: заявки в Базу знаний и подписки на Маркетинг-зону."
        />

        {/* Статистика */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Всего пользователей', value: users.length, icon: Users },
            { label: 'Заявок ждёт', value: pending.length, icon: ShieldCheck },
            { label: 'В команде', value: users.filter(u => u.role === 'team').length, icon: BookMarked },
            { label: 'Подписчиков', value: users.filter(u => u.role === 'partner').length, icon: Crown },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-white p-5 text-center shadow-sm">
              <s.icon className="mx-auto h-6 w-6 text-gold" />
              <p className="mt-2 font-display text-3xl font-bold text-jade">{s.value}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Заявки */}
        <div className="mt-10 rounded-2xl border border-border bg-white p-7 shadow-sm">
          <h3 className="font-display text-xl font-bold text-jade">Заявки на доступ ({pending.length})</h3>
          {pending.length === 0 && (
            <p className="mt-4 rounded-xl bg-mint/50 p-4 text-sm text-muted-foreground">Новых заявок нет — всё обработано.</p>
          )}
          <div className="mt-4 space-y-3">
            {pending.map(r => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/30 bg-[#FBF6E7] p-4">
                <div>
                  <p className="font-semibold text-ink">{r.userName} <span className="text-sm font-normal text-muted-foreground">({r.userEmail})</span></p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {r.type === 'team' ? '→ База знаний (команда)' : '→ Маркетинг-зона (подписка)'} • {r.note || 'без комментария'}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString('ru-RU')}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="jade-gradient text-white" onClick={() => approveRequest(r.id)}>
                    <Check className="mr-1 h-4 w-4" /> Одобрить
                  </Button>
                  <Button size="sm" variant="outline" className="border-cinnabar text-cinnabar" onClick={() => rejectRequest(r.id)}>
                    <X className="mr-1 h-4 w-4" /> Отклонить
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {decided.length > 0 && (
            <>
              <h4 className="mt-8 font-display text-lg font-bold text-jade">История заявок</h4>
              <div className="mt-3 space-y-2">
                {decided.map(r => (
                  <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-mint/40 p-3 text-sm">
                    <span className="text-ink/85">{r.userName} — {r.type === 'team' ? 'База знаний' : 'Маркетинг-зона'}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${r.status === 'approved' ? 'bg-jade text-white' : 'bg-cinnabar text-white'}`}>
                      {r.status === 'approved' ? 'одобрено' : 'отклонено'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Пользователи */}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white p-7 shadow-sm">
          <h3 className="font-display text-xl font-bold text-jade">Пользователи</h3>
          <table className="mt-4 w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-4">Имя</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Роль</th>
                <th className="pb-2">Регистрация</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-semibold text-ink">{u.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{u.email}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      u.role === 'admin' ? 'bg-cinnabar text-white'
                      : u.role === 'partner' ? 'gold-gradient text-ink'
                      : u.role === 'team' ? 'bg-jade text-white'
                      : 'bg-sage/70 text-jade'
                    }`}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString('ru-RU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
