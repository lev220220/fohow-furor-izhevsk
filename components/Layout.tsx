import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth, ROLE_LABELS } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import {
  Menu, X, Flame, Send, MessageCircle, Phone, MapPin, Lock, LogOut, User as UserIcon,
  BookMarked, Crown, ShieldCheck, ChevronDown,
} from 'lucide-react'

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Продукция' },
  { to: '/programs', label: 'Программы здоровья' },
  { to: '/business', label: 'Бизнес' },
  { to: '/training', label: 'Тренинг ФУРОР' },
  { to: '/team', label: 'О команде' },
  { to: '/company', label: 'О компании' },
  { to: '/devices', label: 'Приборы' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { user, logout, hasAccess } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      {/* Верхняя контактная полоса */}
      <div className="bg-ink text-white/85 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-gold" /> Ижевск, Rux 68</span>
            <a href="tel:+79000000000" className="hidden items-center gap-1.5 hover:text-gold sm:flex">
              <Phone className="h-3 w-3 text-gold" /> +7 (900) 000-00-00
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gold">
              <Send className="h-3 w-3" /> Telegram «ФУРОР»
            </a>
            <a href="https://vk.com" target="_blank" rel="noreferrer" className="hidden items-center gap-1 hover:text-gold sm:flex">
              <MessageCircle className="h-3 w-3" /> ВКонтакте
            </a>
          </div>
        </div>
      </div>

      {/* Шапка */}
      <header className="sticky top-0 z-50 border-b border-gold/25 bg-porcelain/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full jade-gradient shadow-md">
              <Flame className="h-5 w-5 text-gold" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-wide text-jade">FOHOW ИЖЕВСК</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-gold">Представительство «ФУРОР»</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? 'bg-jade text-white' : 'text-ink/75 hover:bg-sage/50 hover:text-jade'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="hidden items-center gap-2 md:flex">
                <div className="group relative">
                  <button className="flex items-center gap-2 rounded-full border border-jade/25 bg-white px-3 py-2 text-sm font-medium text-jade">
                    <UserIcon className="h-4 w-4" />
                    {user.name.split(' ')[0]}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="invisible absolute right-0 top-full z-50 w-64 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-border bg-white p-3 shadow-xl">
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-sage/60 px-2 py-0.5 text-[11px] font-semibold text-jade">
                        <ShieldCheck className="h-3 w-3" /> {ROLE_LABELS[user.role]}
                      </p>
                      <div className="mt-3 space-y-1 text-sm">
                        <Link to="/knowledge" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-mint">
                          <BookMarked className="h-4 w-4 text-jade" /> База знаний
                          {!hasAccess('knowledge') && <Lock className="ml-auto h-3.5 w-3.5 text-muted-foreground" />}
                        </Link>
                        <Link to="/marketing" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-mint">
                          <Crown className="h-4 w-4 text-gold" /> Маркетинг-зона
                          {!hasAccess('marketing') && <Lock className="ml-auto h-3.5 w-3.5 text-muted-foreground" />}
                        </Link>
                        {user.role === 'admin' && (
                          <Link to="/admin" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-mint">
                            <ShieldCheck className="h-4 w-4 text-cinnabar" /> Панель администратора
                          </Link>
                        )}
                      </div>
                      <button
                        onClick={() => { logout(); navigate('/') }}
                        className="mt-3 flex w-full items-center gap-2 rounded-lg border-t px-2 pt-2 text-left text-sm text-cinnabar hover:underline"
                      >
                        <LogOut className="h-4 w-4" /> Выйти
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button asChild variant="ghost" className="text-jade">
                  <Link to="/login">Войти</Link>
                </Button>
                <Button asChild className="jade-gradient text-white hover:opacity-90">
                  <Link to="/register">Регистрация</Link>
                </Button>
              </div>
            )}
            <button className="rounded-lg p-2 hover:bg-sage/50 xl:hidden" onClick={() => setOpen(!open)} aria-label="Меню">
              {open ? <X className="h-6 w-6 text-jade" /> : <Menu className="h-6 w-6 text-jade" />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {open && (
          <div className="border-t border-gold/20 bg-porcelain px-4 py-3 xl:hidden">
            <div className="grid gap-1">
              {nav.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-jade text-white' : 'text-ink/80 hover:bg-sage/50'}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-2 border-t pt-3">
                {user ? (
                  <>
                    <Button asChild variant="outline" className="flex-1 border-jade text-jade">
                      <Link to="/knowledge" onClick={() => setOpen(false)}>Мой кабинет</Link>
                    </Button>
                    <Button variant="ghost" className="text-cinnabar" onClick={() => { logout(); setOpen(false); navigate('/') }}>
                      Выйти
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="flex-1 border-jade text-jade">
                      <Link to="/login" onClick={() => setOpen(false)}>Войти</Link>
                    </Button>
                    <Button asChild className="flex-1 jade-gradient text-white">
                      <Link to="/register" onClick={() => setOpen(false)}>Регистрация</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      {/* Подвал */}
      <footer className="bg-ink text-white/80">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full jade-gradient">
                  <Flame className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-white">FOHOW ИЖЕВСК</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">«ФУРОР» • Rux 68</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Здоровье и бизнес по системе Ян-Шэн. Лидеры — Ольга и Олег Кирилловы.
                FOHOW для нас — это стиль жизни.
              </p>
            </div>
            <div>
              <p className="font-display font-semibold text-gold">Навигация</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/catalog" className="hover:text-gold">Каталог продукции</Link></li>
                <li><Link to="/programs" className="hover:text-gold">Программы здоровья</Link></li>
                <li><Link to="/business" className="hover:text-gold">Стать партнёром</Link></li>
                <li><Link to="/reviews" className="hover:text-gold">Отзывы</Link></li>
                <li><Link to="/promo" className="hover:text-gold">Акции</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold text-gold">Закрытые зоны</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/knowledge" className="hover:text-gold">База знаний (для команды)</Link></li>
                <li><Link to="/marketing" className="hover:text-gold">Маркетинг-зона (подписка)</Link></li>
                <li><Link to="/login" className="hover:text-gold">Вход</Link></li>
                <li><Link to="/register" className="hover:text-gold">Регистрация</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold text-gold">Контакты</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> г. Ижевск, Rux 68</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +7 (900) 000-00-00</li>
                <li className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-gold" />
                  <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer" className="hover:text-gold">Telegram-канал «ФУРОР»</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
            <p>
              Все продукты FOHOW являются биологически активными добавками (БАД), не являются лекарственными средствами.
              Перед применением, особенно при хронических заболеваниях, беременности и кормлении грудью, необходима
              консультация врача. Информация на сайте носит ознакомительный характер и не заменяет медицинскую диагностику.
            </p>
            <p className="mt-3">© {new Date().getFullYear()} Представительство «ФУРОР», Ижевск. Ольга и Олег Кирилловы.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
