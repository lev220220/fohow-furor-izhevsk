import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { SectionTitle, ProductCard, Disclaimer } from '@/components/shared'
import { products, METHODS, type Method } from '@/data/products'
import { cn } from '@/lib/utils'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const method = (params.get('method') as Method | null) ?? null

  const filtered = useMemo(
    () => (method ? products.filter(p => p.method.includes(method)) : products),
    [method],
  )

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Каталог FOHOW"
          title="Продукция с открытыми ценами"
          sub="Вся линейка представительства: эликсиры, капсулы, чаи, пептиды и женское здоровье. Каждый продукт — по системе трёх методов Ян-Шэн."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setParams({})}
            className={cn(
              'rounded-full border px-5 py-2 text-sm font-semibold transition-colors',
              !method ? 'jade-gradient border-transparent text-white' : 'border-jade/30 bg-white text-jade hover:bg-mint',
            )}
          >
            Все продукты
          </button>
          {(Object.keys(METHODS) as Method[]).map(m => (
            <button
              key={m}
              onClick={() => setParams({ method: m })}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-semibold transition-colors',
                method === m ? 'jade-gradient border-transparent text-white' : 'border-jade/30 bg-white text-jade hover:bg-mint',
              )}
            >
              <span className="mr-1 text-gold">{METHODS[m].hieroglyph}</span> {METHODS[m].name}
            </button>
          ))}
        </div>

        {method && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            {METHODS[method].desc}
          </p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>

        <div className="mt-14">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
