import { Link } from 'react-router'
import { ArrowRight, Award, Calendar, Quote, Send, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle, CtaBand } from '@/components/shared'
import leaders from '@/assets/leaders.jpg'
import trainingImg from '@/assets/training.jpg'

export default function Team() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Личный бренд"
          title="Команда «ФУРОР» — Ижевск"
          sub="Представительство основано семьёй Кирилловых. FOHOW для нас — не работа, а стиль жизни: мы сами пользуемся каждым продуктом, который рекомендуем."
        />

        {/* Лидеры */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[380px_1fr]">
          <div className="overflow-hidden rounded-3xl border-2 border-gold/40 shadow-xl">
            <img src={leaders} alt="Ольга и Олег Кирилловы" className="w-full object-cover" />
            <p className="bg-white p-3 text-center text-xs text-muted-foreground">
              Ольга и Олег Кирилловы, основатели представительства «ФУРОР»
            </p>
          </div>
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-bold text-jade">Ольга Кириллова</h3>
                <span className="rounded-full gold-gradient px-3 py-1 text-xs font-bold text-ink">Основатель • Тренер «ФУРОР»</span>
              </div>
              <p className="mt-4 leading-relaxed text-ink/85">
                Мы с мужем много лет в сетевом маркетинге — четверть века. Видели взлёты и падения компаний,
                сотни «супер-продуктов» и «уникальных маркетингов». FOHOW стал для нас точкой невозврата:
                когда мама, дети и родители пользуются продуктом каждый день — это уже не бизнес, это стиль жизни.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-mint/60 p-4 text-sm">
                  <Award className="mb-1 h-5 w-5 text-gold" />
                  Мастер VIP-рекомендации корпорации
                </div>
                <div className="rounded-xl bg-mint/60 p-4 text-sm">
                  <Users className="mb-1 h-5 w-5 text-gold" />
                  Лидер структуры в нескольких городах
                </div>
              </div>
              <blockquote className="mt-5 rounded-xl border-l-4 border-gold bg-[#FBF6E7] p-5">
                <Quote className="h-5 w-5 text-gold" />
                <p className="mt-2 font-display text-lg italic text-ink">
                  «Мы научим делать этот бизнес легко. Вы перестанете этим заниматься —
                  вы начнёте этим жить! Так же легко, как дышите».
                </p>
              </blockquote>
            </div>

            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-bold text-jade">Олег Кириллов</h3>
                <span className="rounded-full bg-sage/70 px-3 py-1 text-xs font-bold text-jade">Со-основатель • Стратегия и система</span>
              </div>
              <p className="mt-4 leading-relaxed text-ink/85">
                Олег — «инженер» представительства: система обучения, график выездных школ,
                работа с параллельными структурами и партнёрскими представительствами.
                Отвечает за то, чтобы у каждого новичка был понятный план первых 30 дней —
                и чтобы этот план работал без присутствия лидера.
              </p>
            </div>
          </div>
        </div>

        {/* Атмосфера */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl font-bold text-jade">Команда, с которой не страшно начинать</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              У нас нет «звёзд» и «массовки». Есть система: тренинг «ФУРОР», школа FITA, еженедельные
              встречи в Ижевске и выездные обучения по городам. Новичка не бросают «плавать» —
              с первого дня рядом наставник и готовые инструменты.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Еженедельные встречи команды в Ижевске, Rux 68',
                'Выездные школы по городам — график в Telegram-канале',
                'Наставничество 1-на-1 в первые 30 дней',
                'Закрытая База знаний для команды — на этом сайте',
              ].map(i => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink/85">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {i}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="jade-gradient text-white">
                <Link to="/business">Стать частью команды <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-jade text-jade">
                <a href="https://t.me/+xzWkK51BQUoxMzIy" target="_blank" rel="noreferrer">
                  <Send className="mr-2 h-4 w-4" /> Наш Telegram
                </a>
              </Button>
            </div>
          </div>
          <img src={trainingImg} alt="Команда ФУРОР на тренинге" className="rounded-3xl border-2 border-gold/30 shadow-xl" loading="lazy" />
        </div>

        {/* График */}
        <div className="mt-16 rounded-3xl border border-jade/20 bg-mint/50 p-8">
          <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-jade">
            <Calendar className="h-6 w-6 text-gold" /> График перемещений и обучений
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Мы регулярно проводим школы в других городах — для своей команды и параллельных структур.
            Актуальный график на месяц публикуется в Telegram-канале «ФУРОР» и в закрытой Базе знаний.
            Хотите, чтобы школа прошла в вашем городе? Напишите нам.
          </p>
        </div>
      </div>
      <div className="mt-16">
        <CtaBand
          title="Познакомьтесь с нами лично"
          text="Приходите на еженедельную встречу команды в Ижевске или напишите в Telegram — ответим на любые вопросы о продукте и бизнесе."
        />
      </div>
    </div>
  )
}
