import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string | null
  bio: string | null
  role: 'student' | 'instructor' | 'admin'
  is_active: boolean
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
