import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CheckCircle2, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'

const perks = [
  'Полные цены на весь каталог и приборы',
  'Все отзывы и программы здоровья',
  'Заявка в закрытую Базу знаний команды — одной кнопкой',
  'Оформление подписки на Маркетинг-зону',
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) {
      setError('Пароль — минимум 6 символов')
      return
    }
    const res = register(form)
    if (res.ok) navigate('/knowledge')
    else setError(res.error ?? 'Ошибка регистрации')
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-3xl font-bold text-jade">Регистрация — бесплатно</h1>
          <p className="mt-3 text-muted-foreground">Один аккаунт открывает все уровни сайта:</p>
          <ul className="mt-5 space-y-3">
            {perks.map(p => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jade" /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-mint/60 p-4 text-xs leading-relaxed text-ink/70">
            Доступ в Базу знаний выдаёт лично Ольга (для своей команды). Доступ в Маркетинг-зону —
            по платной подписке для представительств FOHOW. Заявки подаются из личного кабинета после регистрации.
          </p>
        </div>
        <div className="chinese-corner rounded-3xl border-2 border-gold/40 bg-white p-8 shadow-xl">
          <form onSubmit={submit} className="space-y-4">
            <input
              required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше имя и фамилия"
              className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
            />
            <input
              required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
            />
            <input
              required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="Телефон"
              className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
            />
            <input
              required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Пароль (минимум 6 символов)"
              className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
            />
            {error && <p className="rounded-lg bg-[#FDF1EF] p-3 text-sm text-cinnabar">{error}</p>}
            <Button type="submit" className="w-full jade-gradient text-white">
              <UserPlus className="mr-2 h-4 w-4" /> Создать аккаунт
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Регистрируясь, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Уже есть аккаунт? <Link to="/login" className="font-semibold text-jade hover:underline">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
