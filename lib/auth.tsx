import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Role = 'registered' | 'team' | 'partner' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string
  role: Role
  rank?: string
  createdAt: string
}

export interface AccessRequest {
  id: string
  userId: string
  userName: string
  userEmail: string
  type: 'team' | 'partner'
  status: 'pending' | 'approved' | 'rejected'
  note: string
  createdAt: string
}

interface AuthCtx {
  user: User | null
  users: User[]
  requests: AccessRequest[]
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  register: (data: { name: string; email: string; phone: string; password: string }) => { ok: boolean; error?: string }
  requestAccess: (type: 'team' | 'partner', note: string) => void
  myRequest: (type: 'team' | 'partner') => AccessRequest | undefined
  approveRequest: (id: string) => void
  rejectRequest: (id: string) => void
  hasAccess: (zone: 'knowledge' | 'marketing') => boolean
}

const Ctx = createContext<AuthCtx | null>(null)

const LS_USERS = 'furor_users'
const LS_REQS = 'furor_requests'
const LS_SESSION = 'furor_session'

const seedUsers: User[] = [
  {
    id: 'u-admin', name: 'Ольга Кириллова', email: 'admin@furor.ru', phone: '+7 900 000-00-00',
    password: 'admin123', role: 'admin', rank: 'Лидер представительства', createdAt: new Date().toISOString(),
  },
  {
    id: 'u-team', name: 'Марина (команда)', email: 'team@demo.ru', phone: '+7 900 000-00-01',
    password: 'team123', role: 'team', rank: 'Изумруд', createdAt: new Date().toISOString(),
  },
  {
    id: 'u-partner', name: 'Игорь (партнёр)', email: 'partner@demo.ru', phone: '+7 900 000-00-02',
    password: 'partner123', role: 'partner', rank: 'Сапфир, представительство Казань', createdAt: new Date().toISOString(),
  },
]

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = load<User[]>(LS_USERS, [])
    if (!stored.some(u => u.email === 'admin@furor.ru')) {
      const merged = [...seedUsers, ...stored]
      localStorage.setItem(LS_USERS, JSON.stringify(merged))
      return merged
    }
    return stored
  })
  const [requests, setRequests] = useState<AccessRequest[]>(() => load(LS_REQS, []))
  const [sessionId, setSessionId] = useState<string | null>(() => load(LS_SESSION, null))

  useEffect(() => { localStorage.setItem(LS_USERS, JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem(LS_REQS, JSON.stringify(requests)) }, [requests])
  useEffect(() => { localStorage.setItem(LS_SESSION, JSON.stringify(sessionId)) }, [sessionId])

  const user = useMemo(() => users.find(u => u.id === sessionId) ?? null, [users, sessionId])

  const login: AuthCtx['login'] = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim())
    if (!found) return { ok: false, error: 'Пользователь с таким email не найден' }
    if (found.password !== password) return { ok: false, error: 'Неверный пароль' }
    setSessionId(found.id)
    return { ok: true }
  }

  const logout = () => setSessionId(null)

  const register: AuthCtx['register'] = ({ name, email, phone, password }) => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
      return { ok: false, error: 'Такой email уже зарегистрирован' }
    }
    const u: User = {
      id: 'u-' + Date.now(), name, email, phone, password, role: 'registered',
      createdAt: new Date().toISOString(),
    }
    setUsers(prev => [...prev, u])
    setSessionId(u.id)
    return { ok: true }
  }

  const requestAccess: AuthCtx['requestAccess'] = (type, note) => {
    if (!user) return
    if (requests.some(r => r.userId === user.id && r.type === type && r.status === 'pending')) return
    const req: AccessRequest = {
      id: 'r-' + Date.now(), userId: user.id, userName: user.name, userEmail: user.email,
      type, status: 'pending', note, createdAt: new Date().toISOString(),
    }
    setRequests(prev => [req, ...prev])
  }

  const myRequest: AuthCtx['myRequest'] = type => {
    if (!user) return undefined
    return requests.find(r => r.userId === user.id && r.type === type)
  }

  const approveRequest = (id: string) => {
    const req = requests.find(r => r.id === id)
    if (!req) return
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, status: 'approved' } : r)))
    setUsers(prev => prev.map(u => (u.id === req.userId ? { ...u, role: req.type === 'team' ? 'team' : 'partner' } : u)))
  }

  const rejectRequest = (id: string) => {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, status: 'rejected' } : r)))
  }

  const hasAccess: AuthCtx['hasAccess'] = zone => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (zone === 'knowledge') return user.role === 'team' || user.role === 'partner'
    if (zone === 'marketing') return user.role === 'partner'
    return false
  }

  return (
    <Ctx.Provider value={{ user, users, requests, login, logout, register, requestAccess, myRequest, approveRequest, rejectRequest, hasAccess }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const ROLE_LABELS: Record<Role, string> = {
  registered: 'Зарегистрированный',
  team: 'Команда ФУРОР',
  partner: 'Партнёр (подписка)',
  admin: 'Администратор',
}
