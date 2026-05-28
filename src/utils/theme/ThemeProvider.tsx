import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  THEME_COOKIE,
  applyTheme,
  resolveAppliedTheme,
} from '#/utils/theme/theme'
import type { ThemeMode } from '#/utils/theme/theme'
import { setThemeCookie } from '#/utils/theme/theme.functions'

interface ThemeContextValue {
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

// Owns the single source of truth for the theme on the client. Seeded by the
// server-resolved cookie (via route context) so the first paint already
// matches — see THEME_INIT_SCRIPT in `theme.ts` for the pre-hydration paint.
export function ThemeProvider({
  initialThemeMode,
  children,
}: {
  initialThemeMode: ThemeMode
  children: React.ReactNode
}) {
  const [themeMode, setMode] = useState<ThemeMode>(initialThemeMode)

  const setThemeMode = useCallback((next: ThemeMode) => {
    setMode(next)
    document.cookie = `${THEME_COOKIE}=${encodeURIComponent(next)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
    void setThemeCookie({ data: next })
  }, [])

  useEffect(() => {
    applyTheme(resolveAppliedTheme(themeMode))

    if (themeMode !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(resolveAppliedTheme('system'))
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [themeMode])

  // Dev-only Ctrl+D shortcut to toggle light/dark from anywhere in the app.
  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV !== 'development') return

    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || (event.key !== 'd' && event.key !== 'D')) return
      event.preventDefault()
      setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [themeMode, setThemeMode])

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
