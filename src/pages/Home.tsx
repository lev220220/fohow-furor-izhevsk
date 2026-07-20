import { Link } from 'react-router'
import {
  ArrowRight, Award, BookMarked, Crown, Flame, Globe2, HeartPulse,
  Quote, ShieldCheck, Sparkles, Star, Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle, ProductCard, CtaBand, Disclaimer } from '@/components/shared'
import { products, METHODS } from '@/data/products'
import { reviews } from '@/data/reviews'
import hero from '@/assets/hero.jpg'
import leaders from '@/assets/leaders.jpg'
import trainingImg from '@/assets/training.jpg'
import cordyceps from '@/assets/cordyceps.jpg'
import lingzhi from '@/assets/lingzhi.jpg'

const counters = [
  { value: '12,5 млн', label: 'потребителей FOHOW', icon: Users },
  { value: '88', label: 'стран присутствия', icon: Globe2 },
  { value: '1000+', label: 'филиалов по миру', icon: Award },
  { value: '25 лет', label: 'наш опыт в МЛМ', icon: Star },
]

export default function Home() {
  const featured = products.filter(p => ['feniks', 'xueqinfu', 'linchzhi', 'legenda'].includes(p.slug))
  const topReviews = reviews.slice(0, 6)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Эликсиры FOHOW" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 md:min-h-[78vh] md:py-32">
          <div className="max-w-2xl">
            <p className="fade-up inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-jade backdrop-blur">
              <Flame className="h-3.5 w-3.5 text-gold" /> Представительство «ФУРОР» • Ижевск
            </p>
            <h1 className="fade-up-1 mt-6 font-display text-4xl font-bold leading-tight text-ink md:text-6xl">
              Здоровье и бизнес<br />
              <span className="text-jade">по системе </span>
              <span className="relative inline-block text-jade">
                Ян-Шэн
                <span className="absolute -bottom-1 left-0 h-[3px] w-full gold-gradient rounded-full" />
              </span>
            </h1>
            <p className="fade-up-2 mt-6 max-w-xl text-lg text-ink/70">
              25 лет опыта в сетевом маркетинге. Тренинг «ФУРОР». Полный каталог продукции FOHOW
              с ценами, программами и честными отзывами. Лидеры — Ольга и Олег Кирилловы.
            </p>
            <div className="fade-up-3 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="jade-gradient px-8 text-base text-white hover:opacity-90">
                <Link to="/catalog">Заказать продукцию <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-gold bg-white/60 px-8 text-base font-semibold text-ink backdrop-blur hover:bg-gold/20">
                <Link to="/business">Стать партнёром</Link>
              </Button>
            </div>
            <div className="fade-up-3 mt-10 flex items-center gap-4">
              <img src={leaders} alt="Ольга и Олег Кирилловы" className="h-16 w-16 rounded-full border-2 border-gold object-cover shadow-lg" />
              <div className="text-sm">
                <p className="font-semibold text-ink">Ольга и Олег Кирилловы</p>
                <p className="text-ink/60">Основатели представительства «ФУРОР», Rux 68</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* СЧЁТЧИКИ */}
      <section className="border-b border-gold/20 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {counters.map(c => (
            <div key={c.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint">
                <c.icon className="h-6 w-6 text-jade" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-jade">{c.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ФИЛОСОФИЯ ЯН-ШЭН */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="Философия Ян-Шэн"
            title="Три метода здоровья из ТКМ"
            sub="Ян-Шэн (养生) — «культивирование жизни». Вместо борьбы с болезнью система работает на опережение: очищение, регуляция, восстановление."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(Object.keys(METHODS) as Array<keyof typeof METHODS>).map((key, i) => (
              <div key={key} className="chinese-corner group rounded-2xl border border-gold/30 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint font-display text-4xl text-jade transition-colors group-hover:bg-jade group-hover:text-gold">
                  {METHODS[key].hieroglyph}
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-jade">
                  {METHODS[key].name} <span className="text-sm font-normal text-gold">({METHODS[key].latin})</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{METHODS[key].desc}</p>
                <Link to={`/catalog?method=${key}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline">
                  Продукты метода <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="sr-only">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* НАУКА И ДОВЕРИЕ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="Доказательная база"
            title="Китайская мудрость, подтверждённая наукой"
            sub="Мы объясняем продукцию на языке ТКМ, но проверяем фактами европейской медицины. Вот что говорят исследования."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">Scientific Reports, 2024</span>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">
                Рандомизированное исследование: напиток с <strong>кордицепсом</strong> достоверно усилил иммунный ответ
                у здоровых взрослых за счёт активации Т-клеток.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">Front. Cardiovasc. Med., 2022</span>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">
                Клиническое исследование на 1062 участниках: <strong>наттокиназа</strong> эффективно управляет
                прогрессией атеросклероза и гиперлипидемией.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">Ноттингемский университет, 2024</span>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">
                <strong>Кордицепин</strong> из кордицепса подавляет сигнальные пути роста опухолевых клеток —
                механизм изучается для новых препаратов.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
            На странице каждого продукта — раздел «Что говорит наука» с исследованиями по каждому ингредиенту,
            а также отдельные схемы приёма для мужчин и женщин.
          </p>
        </div>
      </section>

      {/* ГРИБЫ-ЗВЁЗДЫ */}
      <section className="bg-mint/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="Сердце формул"
            title="Кордицепс и Линчжи — жемчужины ТКМ"
            sub="Два гриба, на которых построена вся линейка FOHOW. Открывая любой продукт, вы встретите их в составе — и вот почему."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
              <img src={cordyceps} alt="Кордицепс китайский" className="aspect-[3/2] w-full object-cover" loading="lazy" />
              <div className="p-7">
                <h3 className="font-display text-2xl font-bold text-jade">Кордицепс китайский</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">77 микроэлементов • 80+ ферментов • Омега-3/6 • Q10</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Императорский тоник ТКМ. Регулирует иммунитет в обе стороны: поднимает ослабленный
                  и успокаивает избыточный. Работает с лёгкими, почками, печенью и выносливостью.
                  В эликсире «Феникс» его 75%, в «Трёх Драгоценностях» — рекордные 80%.
                </p>
                <Link to="/product/feniks" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-jade hover:text-gold">
                  Смотреть продукты с кордицепсом <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
              <img src={lingzhi} alt="Гриб Линчжи" className="aspect-[3/2] w-full object-cover" loading="lazy" />
              <div className="p-7">
                <h3 className="font-display text-2xl font-bold text-jade">Линчжи (Рейши)</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">«Трава бессмертия» • 2000+ лет в ТКМ • 5 меридианов</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Единственное растение, действующее на все пять меридианов сразу. Полисахариды и
                  органический германий — для иммунитета, тритерпены — для печени и сосудов.
                  В паре с кордицепсом даёт синергию: 1 + 1 = 3.
                </p>
                <Link to="/product/linchzhi" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-jade hover:text-gold">
                  Смотреть капсулы «Линчжи» <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЛИДЕРЫ КАТАЛОГА */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="Бестселлеры"
            title="Продукты, с которых начинают"
            sub="Четыре флагмана представительства. Полные описания, составы и схемы приёма — на странице каждого продукта."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline" className="border-2 border-jade text-jade hover:bg-jade hover:text-white">
              <Link to="/catalog">Весь каталог — {products.length} продуктов <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ТРЕНИНГ ФУРОР */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src={trainingImg} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Авторский тренинг Ольги Кирилловой</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Тренинг «ФУРОР»</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Формула', 'Успеха', 'Решение', 'Ответственность', 'Рост'].map(w => (
                <span key={w} className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">{w}</span>
              ))}
            </div>
            <p className="mt-5 text-white/75">
              Три причины неуспеха в бизнесе — и как убрать каждую. Навыки рекрутирования,
              работа с подсознанием, 4 шага привлечения партнёров. Плюс бонусы только для участников:
              школа карты желаний и трёхчасовой брифинг «вопрос-ответ».
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gold-gradient font-semibold text-ink hover:opacity-90">
                <Link to="/training">Программа тренинга <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/team">Кто ведёт</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img src={trainingImg} alt="Тренинг ФУРОР" className="rounded-2xl border border-gold/30 shadow-2xl" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ЗАКРЫТЫЕ ЗОНЫ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="Для своих и для партнёров"
            title="Две закрытые зоны сайта"
            sub="Знания, которые мы собирали годами, — в двух форматах доступа: бесплатно для команды и по подписке для представительств."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="chinese-corner rounded-2xl border-2 border-jade/25 bg-white p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-mint">
                <BookMarked className="h-7 w-7 text-jade" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-jade">База знаний — бесплатно</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">Для подписчиков команды Ольги</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {['Рекомендации по литературе для бизнеса', 'Школы по важным темам (видео, PDF)', 'Идеи и готовые решения для роста', 'График перемещений по городам'].map(i => (
                  <li key={i} className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" /> {i}</li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-mint/60 p-3 text-xs text-ink/70">
                Доступ — по разрешению Ольги: регистрация → заявка → одобрение администратором.
              </p>
              <Button asChild className="mt-5 jade-gradient text-white">
                <Link to="/knowledge">Получить доступ <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="chinese-corner rounded-2xl border-2 border-gold/50 bg-white p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FBF3DC]">
                <Crown className="h-7 w-7 text-gold" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-jade">Маркетинг-зона — подписка</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">Для других представительств FOHOW</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {['Готовые презентации и скрипты продаж', 'Инфографика, шаблоны постов, фото продукции', 'Видеоматериалы и юридические шаблоны', 'Ежеквартальная аналитика рынка'].map(i => (
                  <li key={i} className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {i}</li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-[#FBF6E7] p-3 text-xs text-ink/70">
                Доступ без возможности копирования: водяные знаки, блокировка печати и скачивания.
              </p>
              <Button asChild className="mt-5 gold-gradient font-semibold text-ink">
                <Link to="/marketing">Условия подписки <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="bg-mint/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="Социальное доказательство"
            title="Отзывы с показателями"
            sub="Только конкретика: имя, возраст, город, диагноз «до» и результат «после»."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topReviews.map(r => (
              <div key={r.name} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                <Quote className="h-6 w-6 text-gold" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cinnabar">{r.diagnosis}</p>
                <p className="mt-2 text-sm text-muted-foreground">Использовала(л): {r.used}</p>
                <p className="mt-2 flex-1 text-sm font-medium text-ink">
                  <HeartPulse className="mr-1 inline h-4 w-4 text-jade" /> {r.result}
                </p>
                <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-ink">{r.name}</span>, {r.age} • {r.city} • {r.category}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline" className="border-2 border-jade text-jade hover:bg-jade hover:text-white">
              <Link to="/reviews">Все отзывы <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          <Disclaimer />
        </div>
      </section>

      <CtaBand
        title="Начните со здоровья — останьтесь ради возможностей"
        text="Напишите нам в Telegram или оставьте заявку: подберём продукт под вашу ситуацию и конституцию по ТКМ — бесплатно и без навязывания."
      />
    </div>
  )
}
