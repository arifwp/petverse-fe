export type ThemeMode = 'light' | 'dark' | 'system'
export type AppliedTheme = 'light' | 'dark'

export const THEME_COOKIE = 'theme'
export const DEFAULT_THEME_MODE: ThemeMode = 'system'

export function parseThemeMode(value: string | undefined | null): ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
    ? value
    : DEFAULT_THEME_MODE
}

// Resolves `system` against the OS preference. Falls back to `light` on the
// server where `matchMedia` is unavailable — the client effect corrects it.
export function resolveAppliedTheme(mode: ThemeMode): AppliedTheme {
  if (mode !== 'system') return mode
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function applyTheme(applied: AppliedTheme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(applied)
  root.setAttribute('data-theme', applied)
  root.style.colorScheme = applied
}

// Runs synchronously in <head> before React hydrates so the correct
// theme is applied during the very first paint — eliminates FOUC.
// Reads the server-set cookie (also handles the `system` case the
// server cannot resolve without `prefers-color-scheme`).
export const THEME_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=([^;]*)/);var mode=m?decodeURIComponent(m[1]):'${DEFAULT_THEME_MODE}';if(mode!=='light'&&mode!=='dark'&&mode!=='system')mode='${DEFAULT_THEME_MODE}';var applied=mode;if(mode==='system'){applied=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(applied);r.setAttribute('data-theme',applied);r.style.colorScheme=applied;}catch(e){}})();`
