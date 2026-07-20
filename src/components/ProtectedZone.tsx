import React, { useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { ShieldAlert } from 'lucide-react'

/**
 * Зона с защитой от копирования:
 * — блокировка правой кнопки, Ctrl+C/X/P/S, перетаскивания
 * — запрет выделения текста и печати (CSS)
 * — водяные знаки с именем и email пользователя
 */
export default function ProtectedZone({ children, zoneName }: { children: React.ReactNode; zoneName: string }) {
  const { user } = useAuth()
  const stamp = `${user?.name ?? 'Гость'} • ${user?.email ?? ''} • ${zoneName} • ФУРОР Ижевск`

  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault()
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'p', 's', 'u'].includes(k)) {
        e.preventDefault()
        e.stopPropagation()
      }
      if (e.key === 'PrintScreen') e.preventDefault()
    }
    const onVisibility = () => {
      if (document.hidden) return
    }
    document.addEventListener('contextmenu', prevent)
    document.addEventListener('copy', prevent)
    document.addEventListener('cut', prevent)
    document.addEventListener('dragstart', prevent)
    document.addEventListener('keydown', onKey, true)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('copy', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('dragstart', prevent)
      document.removeEventListener('keydown', onKey, true)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="protected-zone">
      <div className="watermark-layer" aria-hidden>
        {Array.from({ length: 21 }).map((_, i) => (
          <span key={i} className="px-6 py-10">{stamp}</span>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function ProtectionNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gold/50 bg-[#FBF6E7] p-4 text-sm text-ink/80">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
      <p>
        Материалы этой зоны защищены: копирование, печать и скачивание заблокированы, каждая страница
        помечена вашими персональными водяными знаками. Передача доступа третьим лицам приводит к
        закрытию аккаунта без возврата оплаты.
      </p>
    </div>
  )
}
