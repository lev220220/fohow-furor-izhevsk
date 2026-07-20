import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Flame, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const res = login(email, password)
    if (res.ok) navigate('/knowledge')
    else setError(res.error ?? 'Ошибка входа')
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="chinese-corner rounded-3xl border-2 border-gold/40 bg-white p-8 shadow-xl">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full jade-gradient">
              <Flame className="h-7 w-7 text-gold" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-jade">Вход в личный кабинет</h1>
            <p className="mt-1 text-sm text-muted-foreground">База знаний и Маркетинг-зона — после входа</p>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
            />
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-lg border border-input px-4 py-2.5 text-sm outline-none focus:border-jade"
            />
            {error && <p className="rounded-lg bg-[#FDF1EF] p-3 text-sm text-cinnabar">{error}</p>}
            <Button type="submit" className="w-full jade-gradient text-white">
              <LogIn className="mr-2 h-4 w-4" /> Войти
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Нет аккаунта? <Link to="/register" className="font-semibold text-jade hover:underline">Зарегистрироваться</Link>
          </p>
          <div className="mt-6 rounded-xl bg-mint/60 p-4 text-xs leading-relaxed text-ink/70">
            <p className="font-semibold text-jade">Демо-доступы для знакомства с сайтом:</p>
            <p className="mt-1">Администратор: admin@furor.ru / admin123</p>
            <p>Команда: team@demo.ru / team123</p>
            <p>Партнёр (подписка): partner@demo.ru / partner123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
